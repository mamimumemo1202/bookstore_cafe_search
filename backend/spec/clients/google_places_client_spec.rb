require 'rails_helper'

RSpec.describe GooglePlacesClient do
  subject(:client) { described_class.new('dummy') }

  describe '#search_nearby' do
    it 'APIのパース済みレスポンスを返す' do
      body = { 'results' => [{ 'place_id' => 'pid' }] }
      response = instance_double(HTTParty::Response, success?: true, parsed_response: body)
      allow(described_class).to receive(:get).with('/nearbysearch/json', anything).and_return(response)

      out = client.search_nearby(lat: 35.0, lng: 139.0, type: 'Cafe')
      expect(out).to eq(body)
    end
  end

  describe '#fetch_place_geometry' do
    it 'geometryのみを返す' do
      payload = { 'result' => { 'geometry' => { 'location' => { 'lat' => 1.23, 'lng' => 4.56 } } } }
      response = instance_double(HTTParty::Response, success?: true, parsed_response: payload)
      allow(described_class).to receive(:get).with('/details/json', anything).and_return(response)

      out = client.fetch_place_geometry('PLACE_ID')
      expect(out).to eq(payload['result'])
    end
  end

  describe '#fetch_place_details' do
    it 'photosを最大3件に制限する' do
      five_photos = (1..5).map { |i| { 'photo_reference' => "ref#{i}" } }
      payload = {
        'result' => {
          'name' => 'Shop',
          'geometry' => { 'location' => { 'lat' => 1.0, 'lng' => 2.0 } },
          'photos' => five_photos
        }
      }
      response = instance_double(HTTParty::Response, success?: true, parsed_response: payload)
      allow(described_class).to receive(:get).with('/details/json', anything).and_return(response)

      out = client.fetch_place_details('PLACE_ID')
      expect(out['photos'].size).to eq(3)
      expect(out['photos'].map { |p| p['photo_reference'] }).to eq(%w[ref1 ref2 ref3])
    end
  end

  describe '#fetch_place_details_bulk' do
    it 'フィールドを簡易レコードにマッピングする' do
      resp1 = instance_double(
        HTTParty::Response,
        success?: true,
        parsed_response: {
          'result' => {
            'place_id' => 'p1', 'name' => 'A', 'formatted_address' => 'addr',
            'geometry' => { 'location' => { 'lat' => 1, 'lng' => 2 } },
            'photos' => [{ 'photo_reference' => 'r1' }]
          }
        }
      )
      resp2 = instance_double(
        HTTParty::Response,
        success?: true,
        parsed_response: {
          'result' => {
            'place_id' => 'p2', 'name' => 'B', 'vicinity' => 'vic',
            'geometry' => { 'location' => { 'lat' => 3, 'lng' => 4 } },
            'photos' => []
          }
        }
      )
      allow(described_class).to receive(:get).with('/details/json', any_args).and_return(resp1, resp2)

      out = client.fetch_place_details_bulk(%w[p1 p2])
      expect(out.size).to eq(2)
      expect(out[0]).to include(place_id: 'p1', name: 'A', address: 'addr', lat: 1, lng: 2, photo_ref: 'r1')
      expect(out[1]).to include(place_id: 'p2', name: 'B', address: 'vic', lat: 3, lng: 4)
    end
  end
end
