const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const entropyBits = document.getElementById("entropyBits");

// Update length display
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Generate password function
function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+{}[]<>?/";

  let allChars = "";
  if (uppercase.checked) allChars += upper;
  if (lowercase.checked) allChars += lower;
  if (numbers.checked) allChars += nums;
  if (symbols.checked) allChars += syms;

  // Check if at least one checkbox is selected
  if (allChars.length === 0) {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  passwordBox.value = password;
  updatePasswordStrength(password);
}

// Update password strength indicator
function updatePasswordStrength(password) {
  let strength = 0;
  let length = password.length;
  
  // Length score
  if (length >= 32) strength += 40;
  else if (length >= 24) strength += 30;
  else if (length >= 16) strength += 25;
  else if (length >= 12) strength += 20;
  else if (length >= 8) strength += 10;
  else strength += 5;
  
  // Character variety score
  let hasUpper = /[A-Z]/.test(password);
  let hasLower = /[a-z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSymbol = /[^A-Za-z0-9]/.test(password);
  
  let varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
  strength += varietyCount * 15;
  
  // Calculate entropy
  let charsetSize = 0;
  if (hasUpper) charsetSize += 26;
  if (hasLower) charsetSize += 26;
  if (hasNumber) charsetSize += 10;
  if (hasSymbol) charsetSize += 32;
  
  let entropy = Math.log2(Math.pow(charsetSize, length));
  
  // Update strength meter
  let strengthPercent = Math.min(strength, 100);
  strengthFill.style.width = strengthPercent + '%';
  
  // Update strength text
  if (strengthPercent >= 80) {
    strengthText.textContent = 'Strength: Very Strong';
    strengthText.style.color = '#32ff7e';
  } else if (strengthPercent >= 60) {
    strengthText.textContent = 'Strength: Strong';
    strengthText.style.color = '#fff200';
  } else if (strengthPercent >= 40) {
    strengthText.textContent = 'Strength: Medium';
    strengthText.style.color = '#ff9f1a';
  } else {
    strengthText.textContent = 'Strength: Weak';
    strengthText.style.color = '#ff3838';
  }
  
  // Update entropy bits
  entropyBits.textContent = Math.round(entropy) + ' bits';
}

// Generate password on button click
generateBtn.addEventListener("click", generatePassword);

// Generate initial password on page load
window.addEventListener("load", () => {
  generatePassword();
});

// Copy password to clipboard
copyBtn.addEventListener("click", () => {
  if (!passwordBox.value) return;
  
  navigator.clipboard.writeText(passwordBox.value)
    .then(() => {
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 1500);
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      passwordBox.select();
      document.execCommand("copy");
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 1500);
    });
});

// Create floating particles for background
function createParticles() {
  const colors = ['#9b59b6', '#8e44ad', '#732d91'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
      particle.remove();
    }, parseFloat(particle.style.animationDuration) * 1000);
  }
}

// Create particles every 2 seconds
setInterval(createParticles, 2000);
// Initial particles
createParticles();