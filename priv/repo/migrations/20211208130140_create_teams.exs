defmodule Leaderboard.Repo.Migrations.CreateTeams do
  use Ecto.Migration

  def change do
    create table(:teams) do
      add :name, :string
      add :points, :integer

      timestamps()
    end

  end
end
