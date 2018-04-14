class YahooApi
  include HTTParty
  base_uri ENV['YAHOO_API_BASE_URL']

  def initialize(access_token)
    @headers = {
      'Authorization' => access_token,
      'Content-Type' => 'application/json'
    }
    @stat_categories = {
      0: "GP",
      1: "GS",
      2: "MIN",
      3: "FGA",
      4: "FGM",
      5: "FG%",
      6: "FTA",
      7: "FTM",
      8: "FT%",
      9: "3PTA",
      10: "3PTM",
      11: "3PT%",
      12: "PTS",
      13: "OREB",
      14: "DREB",
      15: "REB",
      16: "AST",
      17: "ST",
      18: "BLK",
      19: "TO",
      20: "A/T",    
      21: "PF",          
      22: "DISQ",
      23: "TECH",
      24: "EJCT",
      25: "FF",
      26: "MPG",
      27: "DD",
      28: "TD"
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
    leagues
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
end