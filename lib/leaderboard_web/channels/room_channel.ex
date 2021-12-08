defmodule LeaderboardWeb.RoomChannel do
  use LeaderboardWeb, :channel
  require Logger
  require Ecto.Query
  alias Leaderboard.{Team}


  def join("frontend:" <> _room, _params, socket) do
    Logger.info("join")
    {:ok, socket}
  end

  def leave(_room_id, _user_id) do
    Logger.info("left")
  end

  def leaving(_room_id, _user_id, _new_host) do
    Logger.info("leaving")
  end

  def handle_in("shout", payload, socket) do
    #    payload {"body" => "message", "name" => "username"}
    #    topic is vissible in socket
    Logger.info(payload)
    "frontend:" <> room = socket.topic
    case payload["body"] do
      "?getLeaderboard" ->
        ret = Team.getAll()
        payload = %{"body" => "?data", data: ret}
        payload = Map.merge(payload, %{"room" => room})
        broadcast socket, "shout", payload
        {:noreply, socket}
      _ ->
        payload = Map.merge(payload, %{"room" => room})
        broadcast socket, "shout", payload
        {:noreply, socket}
    end
  end

end
