const contactsDiv = document.getElementById("contacts");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const templateInput = document.getElementById("template");
const addBtn = document.getElementById("addBtn");

function render() {
	chrome.storage.local.get(["contacts"], ({ contacts }) => {
		contactsDiv.innerHTML = "";
		(contacts || []).forEach((c, i) => {
			const container = document.createElement("div");
			container.innerHTML = `${c.name} (${c.number}) <button data-idx="${i}">Send</button>`;
			contactsDiv.appendChild(container);
			container.querySelector("button").addEventListener("click", () => send(i));
		});
	});
}

function send(idx) {
	chrome.storage.local.get(["contacts"], ({ contacts }) => {
		const c = contacts[idx];
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { type: "send", contact: c });
		});
	});
}

addBtn.addEventListener("click", () => {
	const entry = { name: nameInput.value, number: numberInput.value, template: templateInput.value };
	chrome.storage.local.get(["contacts"], ({ contacts }) => {
		const list = contacts || [];
		list.push(entry);
		chrome.storage.local.set({ contacts: list }, render);
	});
});

render();
