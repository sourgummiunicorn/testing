document.getElementById("spinButton").addEventListener("click", function () {
	let names = ["Amy", "Michael", "David", "Rachel", "Brittany", "Issac"];

	let nameDisplay = document.getElementById("nameDisplay");
	let clickSound = document.getElementById("clickSound");
	clickSound.play();

	// Cycle through names
	let counter = 0;
	let interval = setInterval(function () {
		nameDisplay.textContent = names[counter % names.length];
		counter++;
		if (counter > names.length * 1) {
			clearInterval(interval);
			let randomIndex = Math.floor(Math.random() * names.length);
			nameDisplay.textContent = names[randomIndex];
			clickSound.pause(); 
			clickSound.currentTime = 0; 
		}
	}, 100);
});
