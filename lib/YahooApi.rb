class YahooApi
  include HTTParty
  base_uri ENV['YAHOO_API_BASE_URL']

  def initialize(access_token)
    @headers = {
      'Authorization' => access_token,
      'Content-Type' => 'application/json'
    }
  end

  def user_leagues
    resp = self.class.get(
      ENV['YAHOO_API_LEAGUES_URL'],
      :headers => @headers)
    respJSON = Hash.from_xml(resp.body).as_json
    if(respJSON["fantasy_content"]["users"]["user"]["games"]["count"].to_i > 1)
      respJSON["fantasy_content"]["users"]["user"]["games"].each do |game|
        if(game.game_key == ENV['GAME_ID'])
          leagues = game["leagues"]["league"].to_json
        end
      end
    else
      leagues = respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["leagues"]["league"].to_json
    end
    if(leagues.count >= 1)
      leagues
    else
      leagues = "Error fetching league data"
    end
  end

  def free_agents(league_key, start)
    resp = self.class.get(
      ENV['YAHOO_API_PLAYERS_URL'] + league_key + "/players/stats",
      :headers => @headers,
      :query => { start: start, sort: 'OR', status: 'FA' })
    respJSON = Hash.from_xml(resp.body).as_json
    if(respJSON["fantasy_content"]["league"]["players"]["count"].to_i > 1)
      players = respJSON["fantasy_content"]["league"]["players"]["player"]
    else
      players = "Error fetching players data"
    end
  end

  def user_team(team_key)
    resp = self.class.get(
      ENV['YAHOO_API_TEAM_URL'] + team_key + "/players/stats",
      :headers => @headers)
    respJSON = Hash.from_xml(resp.body).as_json
    byebug
    if(respJSON["fantasy_content"]["league"]["players"]["count"].to_i > 1)
      players = respJSON["fantasy_content"]["league"]["players"]["player"]
    else
      players = "Error fetching team data"
    end
  end
end