defmodule Leaderboard.Repo do
  use Ecto.Repo,
    otp_app: :leaderboard,
    adapter: Ecto.Adapters.Postgres
end
