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
      if(respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["game_key"] == ENV['GAME_ID'])
          leagues = respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["leagues"]["league"].to_json
        end
    end
    if(!leagues.empty?)
      byebug
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
      team = respJSON["fantasy_content"]["league"]["players"]["player"]
    else
      team = "Error fetching team data"
    end
  end

  def user_teams
    teams = []
    resp = self.class.get(
      ENV['YAHOO_API_TEAMS_URL'],
      :headers => @headers)
    respJSON = Hash.from_xml(resp.body).as_json
    if(respJSON["fantasy_content"]["users"]["user"]["teams"]["count"].to_i > 1)
      respJSON["fantasy_content"]["users"]["user"]["teams"]["team"].each do |team|
        if(team["team_key"].split('.').first.to_i >= ENV['GAME_ID'].to_i)
          teams << team
        end
      end
    else
      if(respJSON["fantasy_content"]["users"]["user"]["teams"]["team"]["team_key"].split('.').first.to_i >= ENV['GAME_ID'].to_i)
          teams = respJSON["fantasy_content"]["users"]["user"]["teams"]["team"]
        end
    end
    if(!teams.empty?)
      teams
    else
      teams = "Error fetching league data"
    end
  end
end