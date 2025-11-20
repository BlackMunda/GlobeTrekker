// OOP Travel Packages
class TravelPackage {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    renderCard() {
        return `
      <div class="card">
        <h3>${this.name}</h3>
        <p>${this.description}</p>
        <div class="price"><strong>$${this.price}</strong><small>/person</small></div>
        <a class="btn btn-primary" href="#contact">Book Now</a>
      </div>
    `;
    }
}

const packages = [
    new TravelPackage("Beach Getaway", "Relax on sunny beaches and enjoy luxury resorts.", 799),
    new TravelPackage("Mountain Adventure", "Hiking, camping, and breathtaking mountain views.", 899),
    new TravelPackage("City Explorer", "Discover culture, food, and nightlife in global cities.", 699)
];

const packageContainer = document.querySelector("#packages .cards");
packageContainer.innerHTML = packages.map(pkg => pkg.renderCard()).join("");

// JSON Subscriptions
fetch("/subscriptions.json")
    .then(response => response.json())
    .then(data => {
        const subContainer = document.querySelector("#subscriptions .cards");
        subContainer.innerHTML = data.plans.map(plan => `
      <div class="card">
        <h3>${plan.name}</h3>
        <p>${plan.description}</p>
        <div class="price"><strong>$${plan.price}</strong><small>/month</small></div>
        <a class="btn btn-primary" href="#contact">Subscribe</a>
      </div>
    `).join("");
    })
    .catch(err => console.error("Error loading subscriptions:", err));

// JSON Destinations (Home Page Cards)
fetch("/destinations.json")
    .then(response => response.json())
    .then(data => {
        const destContainer = document.querySelector("#featured-dests");

        if (destContainer) {
            destContainer.innerHTML = data.destinations.slice(0, 4).map(dest => `
                <div class="card">
                    <img src="${dest.image}" alt="${dest.name}">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <a class="btn btn-primary" href="/destinations">Explore</a>
                </div>
            `).join("");
        }

        window.__DESTINATIONS_CACHE = data.destinations || [];
    })
    .catch(err => console.error("Error loading destinations:", err));


