let contract;
let signer;

// Contract address and ABI - replace these with your actual contract details
const CONTRACT_ADDRESS = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
const CONTRACT_ABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "applicant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "personalEmail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "proofIpfsHash",
				"type": "string"
			}
		],
		"name": "ApplicantRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_applicant",
				"type": "address"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sponsor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "applicant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DonationMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "applicant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "HelpRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_personalEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_proofIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerApplicant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerSponsor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "requestHelp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sponsor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "uniqueId",
				"type": "string"
			}
		],
		"name": "SponsorRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "applicant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "applicantList",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "personalEmail",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "fundsReceived",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "proofIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "applicantLogin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "applicants",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "personalEmail",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "fundsReceived",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "proofIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllApplicants",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "personalEmail",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "fundsReceived",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "proofIpfsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					}
				],
				"internalType": "struct ScholarshipPlatform.Applicant[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSponsors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "uniqueId",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					}
				],
				"internalType": "struct ScholarshipPlatform.Sponsor[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_applicant",
				"type": "address"
			}
		],
		"name": "getApplicantDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sponsor",
				"type": "address"
			}
		],
		"name": "getSponsorDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sponsorList",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uniqueId",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "sponsorLogin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "sponsors",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uniqueId",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "uniqueIdToAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];

 // Replace with your actual contract ABI array

// Initialize Ethereum provider and contract
async function connectMetamask() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            // Request account access if needed
            await ethereum.request({ method: 'eth_requestAccounts' });
            
            // Initialize ethers provider and signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // Initialize contract instance
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            
            // Enable the login button after successful connection
            document.getElementById("login").disabled = false;
            alert("MetaMask connected successfully!");
            console.log("MetaMask connected, login button enabled.");
        } else {
            alert("Please install MetaMask!");
        }
    } catch (error) {
        console.error("MetaMask connection failed:", error);
        alert("Failed to connect MetaMask. Please try again.");
    }
}

// Redirect to login page
function redirectToLogin() {
    if (document.getElementById("login").disabled === false) {
        window.location.href = "login.html";
    } else {
        alert("Please connect MetaMask first.");
    }
}

// Event listener to set up the connect button functionality after DOM loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connect-metamask").addEventListener("click", connectMetamask);
});

// Show/hide registration forms based on user role
function showApplicantForm() {
    document.getElementById("applicant-form").style.display = "block";
    document.getElementById("sponsor-form").style.display = "none";
}

function showSponsorForm() {
    document.getElementById("sponsor-form").style.display = "block";
    document.getElementById("applicant-form").style.display = "none";
}

// Applicant registration
async function registerApplicant() {
    const name = document.querySelector('#applicant-form input[placeholder="Name"]').value;
    const email = document.querySelector('#applicant-form input[placeholder="Email"]').value;
    const username = document.querySelector('#applicant-form input[placeholder="Username"]').value;
    const dob = document.querySelector('#applicant-form input[placeholder="Date of Birth"]').value;
    const password = document.querySelector('#applicant-form input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('#applicant-form input[placeholder="Confirm Password"]').value;
    const proofIpfsHash = document.querySelector('#applicant-form input[placeholder="Proof IPFS Hash"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const tx = await contract.registerApplicant(name, email, proofIpfsHash, username, password);
        await tx.wait();
        alert("Applicant registered successfully!");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error registering applicant:", error);
        alert("Registration failed.");
    }
}

// Sponsor registration
async function registerSponsor() {
    const name = document.querySelector('#sponsor-form input[placeholder="Name"]').value;
    const email = document.querySelector('#sponsor-form input[placeholder="Email"]').value;
    const password = document.querySelector('#sponsor-form input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('#sponsor-form input[placeholder="Confirm Password"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const tx = await contract.registerSponsor(name, email, password);
        await tx.wait(); // Wait for the transaction to be mined
        alert("Sponsor registered successfully!");
        window.location.href = "login.html"; // Redirect to the login page after successful registration
    } catch (error) {
        console.error("Error registering sponsor:", error);
        alert("Registration failed.");
    }
}


// Applicant login
async function loginApplicant() {
    const username = document.querySelector('#applicant-login input[placeholder="Username"]').value;
    const password = document.querySelector('#applicant-login input[placeholder="Password"]').value;

    try {
        const isAuthenticated = await contract.applicantLogin(username, password);
        if (isAuthenticated) {
            alert("Login successful!");
            window.location.href = "applicant.html";
        } else {
            alert("Invalid credentials.");
        }
    } catch (error) {
        console.error("Error logging in applicant:", error);
        alert("Login failed.");
    }
}

// Sponsor login
async function loginSponsor() {
    const uniqueId = document.querySelector('#sponsor-login input[placeholder="Unique ID"]').value;
    const password = document.querySelector('#sponsor-login input[placeholder="Password"]').value;

    try {
        const isAuthenticated = await contract.sponsorLogin(password);
        if (isAuthenticated) {
            alert("Login successful!");
            window.location.href = "sponsor.html";
        } else {
            alert("Invalid credentials.");
        }
    } catch (error) {
        console.error("Error logging in sponsor:", error);
        alert("Login failed.");
    }
}

// Sponsor donation to applicant
async function donate() {
    const applicantAddress = document.querySelector('input[placeholder="Applicant Address"]').value;
    const amount = document.querySelector('input[placeholder="Amount (in ETH)"]').value;

    try {
        const tx = await contract.donate(applicantAddress, {
            value: ethers.utils.parseEther(amount)
        });
        await tx.wait();
        alert("Donation successful!");
    } catch (error) {
        console.error("Error making donation:", error);
        alert("Donation failed.");
    }
}

// Applicant request for help
async function requestHelp() {
    const message = document.querySelector('input[placeholder="Message"]').value;

    try {
        const tx = await contract.requestHelp(message);
        await tx.wait();
        alert("Help request sent!");
    } catch (error) {
        console.error("Error requesting help:", error);
        alert("Request failed.");
    }
}

// Search for sponsors
async function searchSponsors() {
    try {
        const sponsors = await contract.getAllSponsors();
        console.log("Sponsors:", sponsors);
        alert("Sponsor search completed. Check console for details.");
    } catch (error) {
        console.error("Error fetching sponsors:", error);
        alert("Search failed.");
    }
}
