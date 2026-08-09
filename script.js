
const toggle = document.querySelector('#motionToggle');
const details = document.querySelector('#planetDetails');
const resetButton = document.querySelector('#resetSelection');

const defaultDetails = `
    <div class="details-header">
        <div>
            <p class="details-kicker">Transmission console</p>
            <h2>Select a planet or the Sun</h2>
        </div>
        <button class="reset-button" id="resetSelection" type="button">Reset selection</button>
    </div>
    <p>Click a planet or the Sun to zoom in and reveal a few cosmic facts.</p>
`;

const planets = {
    Sun: {
        type: 'Yellow dwarf star',
        distance: '150 million km from Earth',
        year: '25 Earth days per rotation',
        facts: [
            'The Sun contains about 99.86% of the mass in our solar system.',
            'It powers the climate, weather, and life on Earth through sunlight.',
            'The Sun is about 4.6 billion years old and will keep shining for billions more.'
        ]
    },
    Mercury: {
        type: 'Rocky planet',
        distance: '57.9 million km from the Sun',
        year: '88 Earth days',
        facts: [
            'A single day on Mercury lasts longer than its year.',
            'Mercury has almost no atmosphere to trap heat or block the Sun.',
            'Its surface is covered with impact craters, like the Moon.'
        ]
    },
    Venus: {
        type: 'Rocky planet',
        distance: '108.2 million km from the Sun',
        year: '225 Earth days',
        facts: [
            'Venus spins backward compared with most planets.',
            'It has the hottest surface temperature of any planet in the solar system.',
            'Venus is wrapped in thick clouds of carbon dioxide and sulfuric acid.'
        ]
    },
    Earth: {
        type: 'Rocky planet',
        distance: '149.6 million km from the Sun',
        year: '365.25 days',
        facts: [
            'Earth is the only known planet with liquid oceans and life.',
            'About 71% of Earth’s surface is covered by water.',
            'Its protective atmosphere filters harmful radiation and helps regulate temperature.'
        ]
    },
    Mars: {
        type: 'Rocky planet',
        distance: '227.9 million km from the Sun',
        year: '687 Earth days',
        facts: [
            'Mars is home to Olympus Mons, the tallest volcano in the solar system.',
            'Its reddish color comes from iron oxide, or rust, on the surface.',
            'Scientists think ancient Mars may have had rivers and lakes.'
        ]
    },
    Jupiter: {
        type: 'Gas giant',
        distance: '778.5 million km from the Sun',
        year: '11.86 Earth years',
        facts: [
            'Jupiter is so large that more than 1,300 Earths could fit inside it.',
            'It has a giant storm called the Great Red Spot, larger than Earth.',
            'Jupiter’s strong magnetic field creates intense radiation belts.'
        ]
    },
    Saturn: {
        type: 'Gas giant',
        distance: '1.43 billion km from the Sun',
        year: '29.45 Earth years',
        facts: [
            'Saturn’s rings are made mostly of ice and rocky debris.',
            'It is the least dense planet in the solar system, lighter than water.',
            'Saturn has dozens of moons, including the icy Titan.'
        ]
    },
    Uranus: {
        type: 'Ice giant',
        distance: '2.87 billion km from the Sun',
        year: '84 Earth years',
        facts: [
            'Uranus rotates almost completely on its side.',
            'Its blue-green color comes from methane gas in its atmosphere.',
            'It has faint rings and a cold, tilted system of seasons.'
        ]
    },
    Neptune: {
        type: 'Ice giant',
        distance: '4.50 billion km from the Sun',
        year: '164.8 Earth years',
        facts: [
            'Neptune has the fastest winds in the solar system.',
            'It was discovered through mathematical prediction before it was seen.',
            'Neptune’s deep blue color is caused by methane absorbing red light.'
        ]
    }
};

function renderDefaultDetails() {
    details.innerHTML = defaultDetails;
    const resetButtonInDefault = document.querySelector('#resetSelection');
    if (resetButtonInDefault) {
        resetButtonInDefault.addEventListener('click', resetSelection);
    }
}

function resetSelection() {
    document.querySelectorAll('.planet-select').forEach((item) => item.classList.remove('is-selected'));
    const sun = document.querySelector('.sun');
    if (sun) {
        sun.classList.remove('is-selected');
    }
    renderDefaultDetails();
}

function renderPlanetDetails(name) {
    const planet = planets[name];
    if (!planet) return;

    const factItems = planet.facts.map((fact) => `<li>${fact}</li>`).join('');

    details.innerHTML = `
        <div class="details-header">
            <div>
                <p class="details-kicker">Transmission received</p>
                <h2>${name}</h2>
            </div>
            <button class="reset-button" id="resetSelection" type="button">Reset selection</button>
        </div>
        <p class="details-type">${planet.type}</p>
        <div class="details-grid">
            <span><b>Distance</b>${planet.distance}</span>
            <span><b>Year length</b>${planet.year}</span>
        </div>
        <ul class="details-facts">${factItems}</ul>
    `;

    const resetButtonInDetails = document.querySelector('#resetSelection');
    if (resetButtonInDetails) {
        resetButtonInDetails.addEventListener('click', resetSelection);
    }
}

document.querySelector('.solar-system').addEventListener('click', (event) => {
    const button = event.target.closest('.planet-select, .sun');
    if (!button) return;

    const name = button.dataset.planet;
    document.querySelectorAll('.planet-select').forEach((item) => item.classList.remove('is-selected'));
    const sun = document.querySelector('.sun');
    if (sun) {
        sun.classList.remove('is-selected');
    }
    button.classList.add('is-selected');
    renderPlanetDetails(name);
    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

if (resetButton) {
    resetButton.addEventListener('click', resetSelection);
}

toggle.addEventListener('click', () => {
    const paused = document.body.classList.toggle('is-paused');
    toggle.textContent = paused ? 'Resume orbits' : 'Pause orbits';
    toggle.setAttribute('aria-pressed', paused);
});

renderDefaultDetails();
