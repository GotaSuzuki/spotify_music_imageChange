import axios from "axios";

class SpotifyClient {
  static async initialize() {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: "479a9a4bd5b44b999184c1e64a5470d8",
        client_secret: "aff02d49f3b44c409acab278c4c3a0ae",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let spotify = new SpotifyClient();
    spotify.token = res.data.access_token;
    return spotify;
  }

  async getTrack() {
    const res = await axios.get(
      "https://api.spotify.com/v1/tracks/02q7qbOYbE89NMFEtOklcc",
      {
        headers: { Authorization: "Bearer " + this.token },
      }
    );
    return res.data;
  }
}

const spotify = await SpotifyClient.initialize();
export default spotify;
