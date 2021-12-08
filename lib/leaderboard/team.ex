defmodule Leaderboard.Team do
  use Ecto.Schema
  import Ecto.Changeset
  alias Leaderboard.{Team, Repo}

  @derive {Jason.Encoder, only: [:name, :points]}
  schema "teams" do
    field :name, :string
    field :points, :integer

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name, :points])
    |> validate_required([:name, :points])
  end

  def getAll() do
    _result = Repo.all(Team)
  end
end
