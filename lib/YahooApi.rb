class YahooApi
  include HTTParty
  base_uri ENV['YAHOO_API_BASE_URL']

  def initialize(access_token)
    # Sets headers with user's JWT for future API requests
    @headers = {
      'Authorization' => access_token,
      'Content-Type' => 'application/json'
    }
  end

  def user
    request = Typhoeus::Request.new(
      ENV['YAHOO_API_USER_URL'],
      method: :get,
      headers: @headers
    )
    request.run()
    resp = request.response
    # Convert from XML to JSON
    respJSON = Hash.from_xml(resp.body).as_json
     # Checks to make sure we got player data, returning it if so, otherwise an error message
    if(respJSON["fantasy_content"]["users"]["user"]["count"].to_i > 0)
      user = respJSON["fantasy_content"]["users"]["user"]
    else
      user = "Error fetching user data"
    end
  end

  def user_leagues
    # Get all leagues a user is in
    resp = self.class.get(
      ENV['YAHOO_API_LEAGUES_URL'],
      :headers => @headers)
    # Convert from XML to JSON
    respJSON = Hash.from_xml(resp.body).as_json
    # Check to make sure there is more than 1 league
    if(respJSON["fantasy_content"]["users"]["user"]["games"]["count"].to_i > 1)
      # For each league, if it is in the current year, add it to leagues
      respJSON["fantasy_content"]["users"]["user"]["games"].each do |game|
        if(game.game_key == ENV['GAME_ID'])
          leagues = game["leagues"]["league"].to_json
        end
      end
    else
      # If there is only one league, check if it is current
      if(respJSON["fantasy_content"]["users"]["user"]["games"]["count"].to_i == 1)
        if(respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["game_key"] == ENV['GAME_ID'])
          leagues = respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["leagues"]["league"].to_json
        end
      end
    end
    # If we have any leagues, return them, else return an error message
    if(!leagues.empty?)
      leagues
    else
      leagues = "No current leagues found"
    end
  end

  def players(league_key)
    # Initialize the players array and players_start as well as hydra which will be used for conccurent api calls
    players = []
    players_start = 0
    hydra = Typhoeus::Hydra.new

    # Players are returned 25 at a time, so step up getting the top 50 players starting at 0 and add them to an array
    requests = 12.times.map do
      request = Typhoeus::Request.new(
        ENV['YAHOO_API_PLAYERS_URL'] + league_key + "/players;status=ALL;sort=OR;start=#{players_start};out=stats,ownership",
        method: :get,
        headers: @headers
      )
      hydra.queue(request)
      players_start += 25
      request
    end

    # Runs all queued reqeusts
    hydra.run

    # Maps request bodies into responses as JSON objects
    # Steps through the resonses, and adds players to 'players' array
    for request in requests
      response = Hash.from_xml(request.response.body).as_json
      # Checks to make sure we got player data, returning it if so, otherwise an error message
      if(response["fantasy_content"]["league"]["players"]["count"].to_i > 0)
        players += response["fantasy_content"]["league"]["players"]["player"]
      else
        players = "Error fetching players data"
      end
    end     
    
    # Return the 'players' array
    players
  end

  def user_team(team_key)
    request = Typhoeus::Request.new(
      ENV['YAHOO_API_TEAM_URL'] + team_key + "/players/stats",
      method: :get,
      headers: @headers
    )
    request.run()
    resp = request.response
    # Convert from XML to JSON
    respJSON = Hash.from_xml(resp.body).as_json
     # Checks to make sure we got player data, returning it if so, otherwise an error message
    if(respJSON["fantasy_content"]["league"]["players"]["count"].to_i > 0)
      team = respJSON["fantasy_content"]["league"]["players"]["player"]
    else
      team = "Error fetching team data"
    end
  end

  def user_teams
    teams = []
    request = Typhoeus::Request.new(
      ENV['YAHOO_API_TEAMS_URL'],
      method: :get,
      headers: @headers
    )
    request.run()
    resp = request.response
    # Convert from XML to JSON
    respJSON = Hash.from_xml(resp.body).as_json
    # Checks if there are multiple teams, only adding those that are current
    if(respJSON["fantasy_content"]["users"]["user"]["teams"]["count"].to_i > 1)
      respJSON["fantasy_content"]["users"]["user"]["teams"]["team"].each do |team|
        if(team["team_key"].split('.').first == ENV['GAME_ID'])
          teams << team
        end
      end
    else
    # If only one team, check if it is current and if it is, return it
    if(respJSON["fantasy_content"]["users"]["user"]["teams"]["count"].to_i == 1)
      if(respJSON["fantasy_content"]["users"]["user"]["teams"]["team"]["team_key"].split('.').first == ENV['GAME_ID'])
          teams << respJSON["fantasy_content"]["users"]["user"]["teams"]["team"]
        end
      end
    end
    # If we have teams, return them, else return an error message
    if(!teams.empty?)
      teams
    else
      teams = "Error fetching league data"
    end
  end
end