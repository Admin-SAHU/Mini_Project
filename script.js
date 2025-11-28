const API_BASE = 'http://localhost:3000/api';


async function fetchCars(){
const res = await fetch(`${API_BASE}/cars`);
const cars = await res.json();
const container = document.getElementById('cars');
container.innerHTML = '';
cars.forEach(car => {
const div = document.createElement('div');
div.className = 'car';
div.innerHTML = `
<div>
<strong>${car.make} ${car.model} (${car.year})</strong>
<div>Price/day: ₹${car.pricePerDay} — ${car.available ? 'Available' : 'Rented'}</div>
</div>
<div>
${car.available ? `<button class="primary" onclick="book('${car._id}')">Rent</button>` : `<button onclick="returnCar('${car._id}')">Return</button>`}
<button class="danger" onclick="deleteCar('${car._id}')">Delete</button>
</div>
`;
container.appendChild(div);
});
}


async function fetchBookings(){
const res = await fetch(`${API_BASE}/bookings`);
const bookings = await res.json();
const container = document.getElementById('bookings');
container.innerHTML = '';
bookings.forEach(b => {
const el = document.createElement('div');
el.className = 'booking';
el.innerHTML = `<div><strong>${b.car.make} ${b.car.model}</strong> — ${new Date(b.from).toLocaleDateString()} to ${new Date(b.to).toLocaleDateString()}</div>`;
container.appendChild(el);
});
}


document.getElementById('car-form').addEventListener('submit', async (e)=>{
e.preventDefault();
const fd = new FormData(e.target);
const payload = {
make: fd.get('make'),
model: fd.get('model'),
year: Number(fd.get('year')),
pricePerDay: Number(fd.get('pricePerDay'))
};
await fetch(`${API_BASE}/cars`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
e.target.reset();
fetchCars();
});


async function book(carId){
const today = new Date();
const to = new Date(); to.setDate(today.getDate() + 3); // default 3 days
const payload = { carId, from: today.toISOString(), to: to.toISOString(), renterName: 'Guest' };
await fetch(`${API_BASE}/bookings`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)});
fetchCars(); fetchBookings();
}
fetchCars(); fetchBookings();