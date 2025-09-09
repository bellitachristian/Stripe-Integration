class APIClient {
  constructor() {
    async function getToken() {
      //fetch token API then returns the valid or active token
    }
    this.TOKEN = getToken();
  }

  // GET
  async get(url, body, options) {
    return this.request(url, body, options, "GET");
  }

  // POST
  async post(url, body, options) {
    return this.request(url, body, options, "POST");
  }

  // PUT
  async put(url, body, options) {
    return this.request(url, body, options, "PUT");
  }

  // DELETE
  async delete(url, body, options) {
    return this.request(url, body, options, "DELETE");
  }

  // PATCH
  async patch(url, body, options) {
    return this.request(url, body, options, "PATCH");
  }

  // REQUEST
  async request(url, body, options, method) {
    let authType = "BEARER";

    // this will checks body if it is in the form of FORMDATA which handles files, images, etc or not
    if (body) {
      if (body instanceof FormData) {
        headers.delete("Content-Type");
      } else {
        body = JSON.stringify(body);
      }
    }
    // check if options has following properties
    if (options) {
      const { auth } = options;
      authType = auth;
    }

    const headers = new Headers({
      pragma: "no-cache",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept-Language": "en",
      Authorization:
        authType == "BASIC"
          ? `Basic ${Buffer.from(process.env.TEST_SECRET_KEY + ":").toString(
              "base64"
            )}`
          : `Bearer ${this.TOKEN}`,
    });

    const response = await fetch(url.toString(), { body, method, headers });

    if (response.status < 400) {
      return await response.json();
    } else {
      throw await response.json();
    }
  }
}

export const apiClient = new APIClient();
