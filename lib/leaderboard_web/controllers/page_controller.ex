defmodule LeaderboardWeb.PageController do
  use LeaderboardWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
