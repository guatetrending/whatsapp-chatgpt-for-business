chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "send") {
		const { number, template } = request.contact;
		const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(template)}`;
		window.location.href = url;
		setTimeout(() => {
			const sendButton = document.querySelector('[data-testid="compose-btn-send"]');
			if (sendButton) sendButton.click();
		}, 4000);
	}
});
