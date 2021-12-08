// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, connect to the socket:
socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("frontend:leaderboard", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp);  channel.push('shout', {body: "?getLeaderboard"})
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

function compare( a, b ) {
    if ( a.points < b.points ){
        return -1;
    }
    if ( a.points > b.points ){
        return 1;
    }
    return 0;
}

function getData(){
    channel.push('shout', {body: "?getLeaderboard"});
}

channel.on('shout', payload => {
    switch (payload.body){
        case "?data":
            let data = payload.data.sort(compare);
            let table = document.getElementById("table")

            for(let index = -1; index < table.rows.length; index++){
                table.deleteRow(index);
            }

            for(let index in data){
                let newRow = table.insertRow(table.rows.length);

                newRow.innerHTML = "                  <tr>\n" +
                    "                    <td class=\"px-6 py-4 whitespace-nowrap\">\n" +
                    "                      <div class=\"flex items-center\">\n" +
                    "                        <div class=\"\">\n" +
                    "                          <div class=\"text-sm font-medium text-gray-900\">\n" +
                    "                            "+ data[index].name +"\n" +
                    "                          </div>\n" +
                    "                        </div>\n" +
                    "                      </div>\n" +
                    "                    </td>\n" +
                    "                    <td class=\"px-6 py-4 whitespace-nowrap\">\n" +
                    "                      <div class=\"text-sm text-gray-900\">" + data[index].points + "</div>\n" +
                    "                    </td>\n" +
                    "                  </tr>";
            }
            break;
        default:
            break;
    }
})

setInterval(getData, 500);

export default socket
