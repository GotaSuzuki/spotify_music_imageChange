/// <reference types="vite/client" />
import axios from "axios";

class SpotifyClient {
  token: string;
  static async initialize() {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
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
        headers: { Authorization: "Bearer " + this.token }
      }
    );
    return res.data;
  }
}

const spotify = await SpotifyClient.initialize();
export default spotify;