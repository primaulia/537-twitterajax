import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["tweetlist"];

  displayCards = (data) => {
    this.tweetlistTarget.innerHTML = ''
    data.tweets.forEach((tweet) => {
      const card = `
        <div class="card" id="tweet-${tweet.id}">
          <div class="card-body">
            <p class="card-text">${tweet.content}</p>
          </div>
        </div>
      `
      this.tweetlistTarget.insertAdjacentHTML('beforeend', card)
    })
  }

  callApi = (url) => {
    fetch(url, {
      headers: { accept: 'application/json' }
    })
      .then(response => response.json())
      .then(this.displayCards)
  }

  feature_filter(event) {
    event.preventDefault();
    this.callApi('/tweets/featured')
  }

  all_filter() {
    event.preventDefault();
    this.callApi('/tweets')
  }
}