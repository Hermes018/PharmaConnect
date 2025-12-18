/**
 * PharmaConnect Intelligence Dashboard
 * Main JavaScript Application
 */

// =============================================================================
// DATA SERVICE CLASS
// =============================================================================

class DataService {
    constructor() {
        this.latency = 400;
        this.initDB();
    }

    initDB() {
        // 1. Users (1 Admin + 10 Agents with Bangladeshi Names)
        if (!localStorage.getItem('pc_users')) {
            const agents = [
                { id: 2, name: 'Rahim Uddin', email: 'rahim@pharma.com' },
                { id: 3, name: 'Fatima Begum', email: 'fatima@pharma.com' },
                { id: 4, name: 'Suman Ahmed', email: 'suman@pharma.com' },
                { id: 5, name: 'Tanjin Tisha', email: 'tanjin@pharma.com' },
                { id: 6, name: 'Sakib Al Hasan', email: 'sakib@pharma.com' },
                { id: 7, name: 'Mashrafe Mortaza', email: 'mashrafe@pharma.com' },
                { id: 8, name: 'Rubana Huq', email: 'rubana@pharma.com' },
                { id: 9, name: 'Zafar Iqbal', email: 'zafar@pharma.com' },
                { id: 10, name: 'Tahsan Khan', email: 'tahsan@pharma.com' },
                { id: 11, name: 'Nusrat Faria', email: 'nusrat@pharma.com' },
                { id: 12, name: 'Sheikh Subhana Bayezid', email: 'subu@pharma.com' }
            ];

            const users = [
                { id: 1, email: 'admin@pharma.com', pass: '123', role: 'admin', name: 'Super Admin', status: 'active' },
                ...agents.map(a => ({ ...a, pass: '123', role: 'agent', status: 'active' }))
            ];
            localStorage.setItem('pc_users', JSON.stringify(users));
        }

        // 2. Inventory (20 Common Medicines in BD)
        if (!localStorage.getItem('pc_inventory')) {
            const inventory = [
                { id: 1, name: 'Napa Extra', category: 'Analgesic', price: 25, stock: 1200, status: 'In Stock' },
                { id: 2, name: 'Sergel 20mg', category: 'Gastric', price: 70, stock: 800, status: 'In Stock' },
                { id: 3, name: 'Monas 10', category: 'Respiratory', price: 180, stock: 50, status: 'Low Stock' },
                { id: 4, name: 'Ace Plus', category: 'Analgesic', price: 30, stock: 500, status: 'In Stock' },
                { id: 5, name: 'Maxpro 40', category: 'Gastric', price: 90, stock: 150, status: 'In Stock' },
                { id: 6, name: 'Pantonix 20', category: 'Gastric', price: 60, stock: 900, status: 'In Stock' },
                { id: 7, name: 'Bizoran 5/20', category: 'Cardiac', price: 120, stock: 40, status: 'Low Stock' },
                { id: 8, name: 'Tufnil', category: 'Pain', price: 150, stock: 300, status: 'In Stock' },
                { id: 9, name: 'Fexo 120', category: 'Antihistamine', price: 80, stock: 600, status: 'In Stock' },
                { id: 10, name: 'Alatrol', category: 'Antihistamine', price: 30, stock: 1000, status: 'In Stock' },
                { id: 11, name: 'Ceevit', category: 'Vitamin', price: 20, stock: 2000, status: 'In Stock' },
                { id: 12, name: 'Neuro-B', category: 'Vitamin', price: 180, stock: 300, status: 'In Stock' },
                { id: 13, name: 'Provair 10', category: 'Respiratory', price: 250, stock: 80, status: 'Low Stock' },
                { id: 14, name: 'Rivotril', category: 'Psychiatry', price: 60, stock: 100, status: 'In Stock' },
                { id: 15, name: 'Thyrox 50', category: 'Thyroid', price: 90, stock: 400, status: 'In Stock' },
                { id: 16, name: 'Voveran', category: 'Pain', price: 110, stock: 250, status: 'In Stock' },
                { id: 17, name: 'Xinc', category: 'Vitamin', price: 45, stock: 500, status: 'In Stock' },
                { id: 18, name: 'Zimax', category: 'Antibiotic', price: 350, stock: 120, status: 'In Stock' },
                { id: 19, name: 'Clofenac', category: 'Pain', price: 85, stock: 600, status: 'In Stock' },
                { id: 20, name: 'Entacyd Plus', category: 'Gastric', price: 15, stock: 5000, status: 'In Stock' }
            ];
            localStorage.setItem('pc_inventory', JSON.stringify(inventory));
        }

        // 3. Doctors (10 Doctors from Real Hospitals)
        if (!localStorage.getItem('pc_doctors')) {
            const doctors = [
                { id: 1, name: 'Dr. Kamal Hossain', hospital: 'Dhaka Medical College', mobile: '01711000000' },
                { id: 2, name: 'Dr. Samia Zaman', hospital: 'Square Hospital', mobile: '01811000000' },
                { id: 3, name: 'Dr. Rafiqul Islam', hospital: 'Evercare Hospital', mobile: '01911000000' },
                { id: 4, name: 'Dr. Anisul Haque', hospital: 'United Hospital', mobile: '01611000000' },
                { id: 5, name: 'Dr. Bilkis Banu', hospital: 'BSMMU (PG Hospital)', mobile: '01511000000' },
                { id: 6, name: 'Dr. Niaz Ahmed', hospital: 'Labaid Specialized', mobile: '01722000000' },
                { id: 7, name: 'Dr. Farhana Karim', hospital: 'Birdem General Hospital', mobile: '01822000000' },
                { id: 8, name: 'Dr. Zahid Hasan', hospital: 'Kurmitola General Hospital', mobile: '01922000000' },
                { id: 9, name: 'Dr. Maliha Tabassum', hospital: 'Ibn Sina Hospital', mobile: '01622000000' },
                { id: 10, name: 'Dr. Subrata Paul', hospital: 'Popular Diagnostic', mobile: '01522000000' }
            ];
            localStorage.setItem('pc_doctors', JSON.stringify(doctors));
        }

        // 4. Locations (Standard BD Divisions)
        if (!localStorage.getItem('pc_locations')) {
            const locs = {
                'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Faridpur'],
                'Chittagong': ['Chittagong', 'Comilla', 'Noakhali', 'Cox\'s Bazar', 'Feni'],
                'Rajshahi': ['Rajshahi', 'Bogura', 'Pabna', 'Natore'],
                'Khulna': ['Khulna', 'Jashore', 'Kushtia', 'Satkhira'],
                'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj'],
                'Barisal': ['Barisal', 'Bhola', 'Patuakhali'],
                'Rangpur': ['Rangpur', 'Dinajpur', 'Kurigram'],
                'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona']
            };
            localStorage.setItem('pc_locations', JSON.stringify(locs));
        }

        // 5. Logs (Simulate 3 months of history for Charts & AI - REALISTIC)
        if (!localStorage.getItem('pc_logs')) {
            const logs = [];
            const agents = JSON.parse(localStorage.getItem('pc_users')).filter(u => u.role === 'agent');
            const docs = JSON.parse(localStorage.getItem('pc_doctors'));
            const products = JSON.parse(localStorage.getItem('pc_inventory'));
            const divisions = Object.keys(JSON.parse(localStorage.getItem('pc_locations')));
            const sentiments = ['Positive', 'Positive', 'Positive', 'Neutral', 'Neutral', 'Negative'];

            const now = Date.now();
            const day = 86400000;
            let logId = 1000;

            // Generate 1-2 transactions per agent for TODAY (realistic daily sales)
            agents.forEach(agent => {
                const todayTransactions = Math.floor(Math.random() * 2) + 1; // 1-2 transactions today
                for (let t = 0; t < todayTransactions; t++) {
                    const doc = docs[Math.floor(Math.random() * docs.length)];
                    const prod = products[Math.floor(Math.random() * products.length)];
                    const qty = Math.floor(Math.random() * 10) + 5; // 5-15 units (realistic)
                    const sale = prod.price * qty;
                    const comm = Math.floor(sale * 0.05);
                    const div = divisions[Math.floor(Math.random() * divisions.length)];
                    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

                    logs.push({
                        id: logId++,
                        time: new Date(now - Math.floor(Math.random() * day * 0.5)).toISOString(), // Today
                        agent: agent.name,
                        doctor: doc.name,
                        product: prod.name,
                        qty: qty,
                        sale: sale,
                        comm: comm,
                        sentiment: sentiment,
                        feedback: sentiment === 'Negative' ? 'Doctor complained about price' : 'Doctor requested more samples',
                        division: div,
                        district: div
                    });
                }
            });

            // Generate remaining ~120 transactions spread over past 90 days (excluding today)
            for (let i = 0; i < 120; i++) {
                const daysAgo = Math.floor(Math.random() * 89) + 1; // 1 to 89 days ago (not today)
                const agent = agents[Math.floor(Math.random() * agents.length)];
                const doc = docs[Math.floor(Math.random() * docs.length)];
                const prod = products[Math.floor(Math.random() * products.length)];
                const qty = Math.floor(Math.random() * 15) + 3; // 3-18 units
                const sale = prod.price * qty;
                const comm = Math.floor(sale * 0.05);
                const div = divisions[Math.floor(Math.random() * divisions.length)];
                const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

                logs.push({
                    id: logId++,
                    time: new Date(now - (daysAgo * day) - Math.floor(Math.random() * day)).toISOString(),
                    agent: agent.name,
                    doctor: doc.name,
                    product: prod.name,
                    qty: qty,
                    sale: sale,
                    comm: comm,
                    sentiment: sentiment,
                    feedback: sentiment === 'Negative' ? 'Doctor complained about price' : 'Doctor requested more samples',
                    division: div,
                    district: div
                });
            }

            logs.sort((a, b) => new Date(b.time) - new Date(a.time));
            localStorage.setItem('pc_logs', JSON.stringify(logs));
        }
    }

    async delay() {
        return new Promise(resolve => setTimeout(resolve, this.latency));
    }

    // =========================================================================
    // AUTHENTICATION
    // =========================================================================

    async login(email, pass) {
        await this.delay();
        const users = JSON.parse(localStorage.getItem('pc_users'));
        const user = users.find(u => u.email === email && u.pass === pass);
        if (user) {
            if (user.status === 'pending') return { success: false, message: 'Account pending approval.' };
            if (user.status === 'denied') return { success: false, message: 'Account Access Denied.' };
            localStorage.setItem('pc_session', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    async register(email, pass, name) {
        await this.delay();
        const users = JSON.parse(localStorage.getItem('pc_users'));
        if (users.find(u => u.email === email)) return { success: false, message: 'Email exists' };
        users.push({ id: Date.now(), email, pass, name, role: 'agent', status: 'pending' });
        localStorage.setItem('pc_users', JSON.stringify(users));
        return { success: true, message: 'Registration Successful. Wait for Admin Approval.' };
    }

    async logout() {
        await this.delay();
        localStorage.removeItem('pc_session');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('pc_session'));
    }

    // =========================================================================
    // USER MANAGEMENT
    // =========================================================================

    async getUsers() {
        await this.delay();
        return JSON.parse(localStorage.getItem('pc_users'));
    }

    async updateUser(id, updates) {
        await this.delay();
        let users = JSON.parse(localStorage.getItem('pc_users'));
        const idx = users.findIndex(u => u.id === id);
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...updates };
            localStorage.setItem('pc_users', JSON.stringify(users));
        }
    }

    // =========================================================================
    // INVENTORY MANAGEMENT
    // =========================================================================

    async getInventory() {
        await this.delay();
        return JSON.parse(localStorage.getItem('pc_inventory'));
    }

    async updateInventory(item) {
        await this.delay();
        let inv = JSON.parse(localStorage.getItem('pc_inventory'));
        if (item.id) {
            const idx = inv.findIndex(i => i.id === item.id);
            if (idx !== -1) inv[idx] = { ...inv[idx], ...item };
        } else {
            item.id = Date.now();
            inv.push(item);
        }
        localStorage.setItem('pc_inventory', JSON.stringify(inv));
        return inv;
    }

    async deleteInventory(id) {
        await this.delay();
        let inv = JSON.parse(localStorage.getItem('pc_inventory'));
        inv = inv.filter(i => i.id !== id);
        localStorage.setItem('pc_inventory', JSON.stringify(inv));
    }

    // =========================================================================
    // INVENTORY PREDICTIONS (NEW FEATURE)
    // =========================================================================

    /**
     * Calculate inventory predictions with burn rate and stockout risk
     * @returns {Promise<Array>} Inventory items with daysRemaining and riskLevel
     */
    async getInventoryPredictions() {
        await this.delay();

        // Fetch data from localStorage
        const logs = JSON.parse(localStorage.getItem('pc_logs')) || [];
        const inventory = JSON.parse(localStorage.getItem('pc_inventory')) || [];

        // Calculate date 30 days ago
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

        // Filter logs from last 30 days
        const recentLogs = logs.filter(log => new Date(log.time) >= thirtyDaysAgo);

        // Calculate quantity sold per product in last 30 days
        const productSales = {};
        recentLogs.forEach(log => {
            const product = log.product;
            const qty = parseInt(log.qty) || 0;
            productSales[product] = (productSales[product] || 0) + qty;
        });

        // Calculate predictions for each inventory item
        const predictions = inventory.map(item => {
            const totalSold = productSales[item.name] || 0;
            const burnRate = totalSold / 30; // Average per day

            let daysRemaining;
            if (burnRate === 0) {
                daysRemaining = Infinity; // No sales, infinite days remaining
            } else {
                daysRemaining = Math.floor(item.stock / burnRate);
            }

            // Determine risk level
            let riskLevel;
            if (daysRemaining < 7) {
                riskLevel = 'Critical';
            } else if (daysRemaining < 15) {
                riskLevel = 'Warning';
            } else {
                riskLevel = 'Safe';
            }

            return {
                ...item,
                burnRate: Math.round(burnRate * 100) / 100,
                daysRemaining: daysRemaining === Infinity ? 'N/A' : daysRemaining,
                riskLevel
            };
        });

        return predictions;
    }

    // =========================================================================
    // LOCATIONS
    // =========================================================================

    async getLocations() {
        await this.delay();
        return JSON.parse(localStorage.getItem('pc_locations'));
    }

    // =========================================================================
    // DOCTORS
    // =========================================================================

    async getDoctors() {
        await this.delay();
        return JSON.parse(localStorage.getItem('pc_doctors'));
    }

    async addDoctor(doc) {
        await this.delay();
        let d = JSON.parse(localStorage.getItem('pc_doctors'));
        d.push({ id: Date.now(), ...doc });
        localStorage.setItem('pc_doctors', JSON.stringify(d));
    }

    async deleteDoctor(id) {
        await this.delay();
        let d = JSON.parse(localStorage.getItem('pc_doctors'));
        d = d.filter(x => x.id !== id);
        localStorage.setItem('pc_doctors', JSON.stringify(d));
    }

    // =========================================================================
    // LOGS & STATISTICS
    // =========================================================================

    async addLog(logData) {
        await this.delay();
        let logs = JSON.parse(localStorage.getItem('pc_logs')) || [];
        let inv = JSON.parse(localStorage.getItem('pc_inventory'));
        let item = inv.find(i => i.name === logData.product);
        let sale = 0, comm = 0;

        if (item) {
            item.stock -= parseInt(logData.qty);
            if (item.stock < 10) item.status = 'Low Stock';
            localStorage.setItem('pc_inventory', JSON.stringify(inv));
            sale = item.price * parseInt(logData.qty);
            comm = sale * 0.10;
        }

        const newLog = {
            id: Date.now(),
            time: new Date().toISOString(),
            agent: this.getCurrentUser().name,
            sale: sale,
            comm: comm,
            feedback: logData.feedback || '',
            division: logData.division || 'Unknown',
            district: logData.district || 'Unknown',
            ...logData
        };
        logs.unshift(newLog);
        localStorage.setItem('pc_logs', JSON.stringify(logs));
        return newLog;
    }

    async getLogs() {
        await this.delay();
        return JSON.parse(localStorage.getItem('pc_logs'));
    }

    async getStats(range = 'all') {
        await this.delay();
        const allLogs = JSON.parse(localStorage.getItem('pc_logs'));
        const inv = JSON.parse(localStorage.getItem('pc_inventory'));
        const users = JSON.parse(localStorage.getItem('pc_users'));

        const now = new Date();
        let filteredLogs = allLogs;
        if (range !== 'all') {
            const ranges = {
                '1w': 7 * 24 * 60 * 60 * 1000,
                '1m': 30 * 24 * 60 * 60 * 1000,
                '3m': 90 * 24 * 60 * 60 * 1000,
                '6m': 180 * 24 * 60 * 60 * 1000,
                '1y': 365 * 24 * 60 * 60 * 1000
            };
            const cutoff = now.getTime() - ranges[range];
            filteredLogs = allLogs.filter(l => new Date(l.time).getTime() >= cutoff);
        }

        const revenue = filteredLogs.reduce((acc, l) => acc + (l.sale || 0), 0);
        const commissionPaid = filteredLogs.reduce((acc, l) => acc + (l.comm || 0), 0);

        const locStats = {};
        filteredLogs.forEach(l => {
            const div = l.division || 'Unknown';
            locStats[div] = (locStats[div] || 0) + (l.sale || 0);
        });

        const allAgents = users.filter(u => u.role === 'agent');
        return {
            revenue,
            visits: filteredLogs.length,
            activeAgents: allAgents.filter(u => u.status === 'active').length,
            totalAgents: allAgents.length,
            health: inv.filter(i => i.status === 'Low Stock').length > 0 ? 'Alert' : 'Good',
            commissionPaid,
            totalDoctors: (JSON.parse(localStorage.getItem('pc_doctors')) || []).length,
            locStats
        };
    }

    async getAgentStats(agentName, range = 'today') {
        await this.delay();
        const logs = JSON.parse(localStorage.getItem('pc_logs'));
        let myLogs = logs.filter(l => l.agent === agentName);

        // Filter by time range
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (range === 'today') {
            myLogs = myLogs.filter(l => new Date(l.time) >= today);
        } else if (range === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            myLogs = myLogs.filter(l => new Date(l.time) >= weekAgo);
        } else if (range === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            myLogs = myLogs.filter(l => new Date(l.time) >= monthAgo);
        }

        const totalComm = myLogs.reduce((acc, l) => acc + (l.comm || 0), 0);
        const totalSale = myLogs.reduce((acc, l) => acc + (l.sale || 0), 0);
        return { totalComm, totalSale, logs: myLogs, range };
    }

    // =========================================================================
    // AGENT PERFORMANCE (NEW FEATURE)
    // =========================================================================

    /**
     * Calculate agent performance metrics with sentiment analysis and ranking
     * @returns {Promise<Array>} Agents ranked by performance with metrics
     */
    async getAgentPerformance() {
        await this.delay();

        // Fetch logs from localStorage
        const logs = JSON.parse(localStorage.getItem('pc_logs')) || [];

        // Group data by agent
        const agentData = {};

        logs.forEach(log => {
            const agentName = log.agent;

            if (!agentData[agentName]) {
                agentData[agentName] = {
                    name: agentName,
                    totalSales: 0,
                    totalCommission: 0,
                    conversionCount: 0,
                    sentimentPoints: 0,
                    sentimentCount: 0
                };
            }

            // Calculate metrics
            agentData[agentName].totalSales += (log.sale || 0);
            agentData[agentName].totalCommission += (log.comm || 0);
            agentData[agentName].conversionCount += 1;

            // Sentiment scoring
            const sentiment = log.sentiment || 'Neutral';
            let sentimentScore = 5; // Default neutral
            if (sentiment === 'Positive') {
                sentimentScore = 10;
            } else if (sentiment === 'Negative') {
                sentimentScore = 0;
            }

            agentData[agentName].sentimentPoints += sentimentScore;
            agentData[agentName].sentimentCount += 1;
        });

        // Convert to array and calculate average satisfaction
        const agentsArray = Object.values(agentData).map(agent => {
            const avgSatisfaction = agent.sentimentCount > 0
                ? Math.round((agent.sentimentPoints / agent.sentimentCount) * 10) / 10
                : 0;

            return {
                name: agent.name,
                totalSales: agent.totalSales,
                totalCommission: agent.totalCommission,
                conversionCount: agent.conversionCount,
                avgSatisfactionScore: avgSatisfaction
            };
        });

        // Sort by totalSales descending
        agentsArray.sort((a, b) => b.totalSales - a.totalSales);

        // Assign ranks
        const rankedAgents = agentsArray.map((agent, index) => {
            let rank;
            switch (index) {
                case 0:
                    rank = '1st';
                    break;
                case 1:
                    rank = '2nd';
                    break;
                case 2:
                    rank = '3rd';
                    break;
                default:
                    rank = `${index + 1}th`;
            }

            return {
                ...agent,
                rank,
                rankNumber: index + 1
            };
        });

        return rankedAgents;
    }
}

// =============================================================================
// INITIALIZE DATA SERVICE
// =============================================================================

const db = new DataService();
const app = document.getElementById('app');

// =============================================================================
// TOAST NOTIFICATIONS
// =============================================================================

const showToast = (msg, type = 'success') => {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    el.className = `${color} text-white px-6 py-3 rounded-lg shadow-xl mb-3 slide-in flex items-center gap-3`;
    el.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> <span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);
};

// =============================================================================
// GENERIC MODAL
// =============================================================================

const renderModal = (title, inputs, callback) => {
    const el = document.createElement('div');
    el.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 slide-in';
    el.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 class="text-xl font-bold mb-4 text-slate-800">${title}</h3>
            <form id="modalForm" class="space-y-4">
                ${inputs.map(i => `<div><label class="block text-sm font-medium text-slate-700 mb-1">${i.label}</label><input type="${i.type || 'text'}" name="${i.name}" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="${i.placeholder || ''}" required value="${i.value || ''}"></div>`).join('')}
                <div class="flex justify-end gap-3 mt-6"><button type="button" id="modalCancel" class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button><button type="submit" class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Save</button></div>
            </form>
        </div>
    `;
    document.body.appendChild(el);
    document.getElementById('modalCancel').onclick = () => el.remove();
    document.getElementById('modalForm').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        inputs.forEach(i => data[i.name] = formData.get(i.name));
        callback(data);
        el.remove();
    };
};

// =============================================================================
// MAIN RENDER FUNCTION
// =============================================================================

const render = async () => {
    const user = db.getCurrentUser();
    if (!user) renderLogin();
    else if (user.role === 'admin') renderAdmin(user);
    else renderAgent(user);
};

// =============================================================================
// LOGIN VIEW
// =============================================================================

const renderLogin = (mode = 'login') => {
    app.innerHTML = `
        <div class="min-h-screen w-full flex">
            <!-- Left Hero Section - CVS Style -->
            <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-red-600 via-red-700 to-red-900 items-center justify-center relative overflow-hidden">
                <!-- Decorative Elements -->
                <div class="absolute top-0 left-0 w-full h-full opacity-10">
                    <div class="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                    <div class="absolute bottom-20 right-20 w-48 h-48 border-4 border-white rounded-full"></div>
                    <div class="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white rounded-full"></div>
                </div>
                
                <div class="text-white text-center z-10 p-12 max-w-lg">
                    <!-- Logo/Brand -->
                    <div class="mb-8">
                        <div class="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur rounded-2xl mb-6 shadow-2xl">
                            <i class="fas fa-pills text-5xl text-white"></i>
                        </div>
                        <h1 class="text-5xl font-bold mb-4 tracking-tight">PharmaConnect</h1>
                        <p class="text-xl text-red-100 font-light">Enterprise Intelligence Platform</p>
                    </div>
                    
                    <!-- Features List -->
                    <div class="mt-12 space-y-4 text-left">
                        <div class="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
                            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i class="fas fa-chart-line text-white"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold">Real-time Analytics</h3>
                                <p class="text-sm text-red-100">Track sales & performance instantly</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
                            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i class="fas fa-brain text-white"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold">AI-Powered Insights</h3>
                                <p class="text-sm text-red-100">Smart predictions & recommendations</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
                            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i class="fas fa-users text-white"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold">Team Management</h3>
                                <p class="text-sm text-red-100">Monitor agent performance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Login Section -->
            <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
                <div class="w-full max-w-md">
                    <!-- Mobile Logo -->
                    <div class="lg:hidden text-center mb-8">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-xl mb-4 shadow-lg">
                            <i class="fas fa-pills text-3xl text-white"></i>
                        </div>
                        <h1 class="text-2xl font-bold text-slate-800">PharmaConnect</h1>
                    </div>
                    
                    <!-- Login Card -->
                    <div class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 slide-in">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-slate-800">${mode === 'login' ? 'Welcome Back' : 'Join Our Team'}</h2>
                            <p class="text-slate-500 mt-2">${mode === 'login' ? 'Sign in to access your dashboard' : 'Request access to the platform'}</p>
                        </div>
                        
                        <form id="authForm" class="space-y-5">
                            ${mode === 'register' ? `
                                <div class="relative">
                                    <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                    <input type="text" id="name" class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-slate-50 transition" placeholder="Full Name" required>
                                </div>
                            ` : ''}
                            <div class="relative">
                                <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input type="email" id="email" class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-slate-50 transition" placeholder="Email Address" required>
                            </div>
                            <div class="relative">
                                <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input type="password" id="password" class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-slate-50 transition" placeholder="Password" required>
                            </div>
                            
                            <button type="submit" class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                                <span>${mode === 'login' ? 'Sign In' : 'Submit Request'}</span>
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </form>
                        
                        <div class="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p class="text-slate-500 text-sm">
                                ${mode === 'login' ? "Don't have access?" : 'Already have an account?'}
                                <a href="#" onclick="renderLogin('${mode === 'login' ? 'register' : 'login'}')" class="text-red-600 hover:text-red-700 font-semibold ml-1">${mode === 'login' ? 'Request Access' : 'Sign In'}</a>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <p class="text-center text-slate-400 text-xs mt-6">© 2024 PharmaConnect. Secure & Trusted.</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('authForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        if (mode === 'login') {
            const res = await db.login(email, pass);
            if (res.success) {
                showToast('Login Successful');
                render();
            } else {
                showToast(res.message, 'error');
            }
        } else {
            const name = document.getElementById('name').value;
            const res = await db.register(email, pass, name);
            if (res.success) {
                showToast(res.message);
                renderLogin('login');
            } else {
                showToast(res.message, 'error');
            }
        }
    });
};

// =============================================================================
// ADMIN VIEW
// =============================================================================

const renderAdmin = async (user, range = 'all') => {
    app.innerHTML = `
        <div class="flex h-screen bg-slate-50">
            <aside class="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full z-20">
                <div class="p-6 border-b border-slate-700"><h2 class="text-2xl font-bold"><i class="fas fa-flask"></i> PharmaConnect</h2></div>
                <nav class="flex-1 p-4 space-y-2">
                    <button onclick="router('overview')" id="nav-overview" class="nav-btn w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"><i class="fas fa-chart-pie w-5"></i> Overview</button>
                    <button onclick="router('inventory')" id="nav-inventory" class="nav-btn w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"><i class="fas fa-boxes w-5"></i> Inventory</button>
                    <button onclick="router('doctors')" id="nav-doctors" class="nav-btn w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"><i class="fas fa-user-md w-5"></i> Doctors</button>
                    <button onclick="router('agents')" id="nav-agents" class="nav-btn w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"><i class="fas fa-users w-5"></i> Agents</button>
                    <button onclick="router('analysis')" id="nav-analysis" class="nav-btn w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"><i class="fas fa-brain w-5"></i> Intelligence</button>
                </nav>
                <div class="p-4 border-t border-slate-700"><button onclick="logout()" class="w-full px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-800 text-sm">Log Out</button></div>
            </aside>
            <main class="md:ml-64 flex-1 p-8 overflow-y-auto"><div id="admin-content" class="max-w-7xl mx-auto space-y-8"></div></main>
        </div>
    `;
    window.router('overview', range);
};

// =============================================================================
// STOCK PREDICTION ALERT WIDGET (NEW)
// =============================================================================

const renderStockPredictionAlert = async () => {
    const predictions = await db.getInventoryPredictions();
    const criticalItems = predictions.filter(item => item.riskLevel === 'Critical');

    if (criticalItems.length === 0) {
        return '';
    }

    return `
        <div class="prediction-alert rounded-xl p-4 mb-6 slide-in">
            <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                <h3 class="font-bold text-red-800">Stock Prediction Alert</h3>
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">${criticalItems.length} Critical</span>
            </div>
            <div class="space-y-2">
                ${criticalItems.map(item => `
                    <div class="prediction-alert-item bg-white/50 rounded-lg px-3 py-2">
                        <i class="fas fa-pills text-red-400"></i>
                        <span class="font-semibold">${item.name}</span>
                        <span class="text-slate-600">•</span>
                        <span class="text-slate-600">Stock: ${item.stock}</span>
                        <span class="text-slate-600">•</span>
                        <span class="risk-critical">${item.daysRemaining === 'N/A' ? 'No recent sales' : item.daysRemaining + ' days remaining'}</span>
                        <span class="text-xs text-slate-500 ml-auto">(${item.burnRate}/day burn rate)</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

// =============================================================================
// TOP PERFORMERS LEADERBOARD (NEW)
// =============================================================================

const renderTopPerformers = async () => {
    const agents = await db.getAgentPerformance();

    if (agents.length === 0) {
        return '<p class="text-slate-500 italic">No agent performance data available.</p>';
    }

    const getRankBadgeClass = (rankNumber) => {
        switch (rankNumber) {
            case 1: return 'rank-1';
            case 2: return 'rank-2';
            case 3: return 'rank-3';
            default: return 'rank-other';
        }
    };

    const getSentimentClass = (score) => {
        if (score >= 7) return 'sentiment-high';
        if (score >= 4) return 'sentiment-medium';
        return 'sentiment-low';
    };

    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden slide-in">
            <div class="p-6 border-b border-slate-100 flex items-center gap-3">
                <i class="fas fa-trophy text-yellow-500 text-xl"></i>
                <h3 class="font-bold text-lg">Top Performers Leaderboard</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th class="p-4">Rank</th>
                            <th class="p-4">Agent</th>
                            <th class="p-4">Total Sales</th>
                            <th class="p-4">Commission</th>
                            <th class="p-4">Orders</th>
                            <th class="p-4">Satisfaction</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${agents.map(agent => `
                            <tr class="${agent.rankNumber === 1 ? 'leaderboard-gold' : ''}">
                                <td class="p-4">
                                    <span class="rank-badge ${getRankBadgeClass(agent.rankNumber)}">${agent.rankNumber}</span>
                                </td>
                                <td class="p-4">
                                    <div class="flex items-center gap-2">
                                        ${agent.rankNumber === 1 ? '<i class="fas fa-crown text-yellow-500"></i>' : ''}
                                        <span class="font-semibold">${agent.name}</span>
                                    </div>
                                </td>
                                <td class="p-4 font-semibold text-green-600">৳ ${agent.totalSales.toLocaleString()}</td>
                                <td class="p-4 text-purple-600">৳ ${agent.totalCommission.toLocaleString()}</td>
                                <td class="p-4">${agent.conversionCount}</td>
                                <td class="p-4">
                                    <span class="sentiment-score ${getSentimentClass(agent.avgSatisfactionScore)}">
                                        <i class="fas fa-smile"></i>
                                        ${agent.avgSatisfactionScore}/10
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

// =============================================================================
// ROUTER
// =============================================================================

window.logout = () => db.logout().then(render);

window.router = async (view, range = 'all') => {
    const container = document.getElementById('admin-content');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
    const btn = document.getElementById(`nav-${view}`);
    if (btn) btn.classList.add('bg-blue-600', 'text-white');
    container.innerHTML = '<div class="text-center py-20"><i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i></div>';

    if (view === 'overview') {
        const stats = await db.getStats(range);
        container.innerHTML = `
            <div class="flex justify-between items-center mb-6 slide-in">
                <h2 class="text-2xl font-bold">Dashboard Overview</h2>
                <select onchange="router('overview', this.value)" class="p-2 rounded border border-slate-300 bg-white">
                    <option value="all" ${range === 'all' ? 'selected' : ''}>All History</option>
                    <option value="1w" ${range === '1w' ? 'selected' : ''}>Last Week</option>
                    <option value="1m" ${range === '1m' ? 'selected' : ''}>Last Month</option>
                    <option value="3m" ${range === '3m' ? 'selected' : ''}>Last 3 Months</option>
                    <option value="6m" ${range === '6m' ? 'selected' : ''}>Last 6 Months</option>
                    <option value="1y" ${range === '1y' ? 'selected' : ''}>Last Year</option>
                </select>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-in">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="text-slate-500 text-sm font-medium">Total Revenue</div>
                    <div class="text-3xl font-bold text-slate-800">৳ ${stats.revenue.toLocaleString()}</div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="text-slate-500 text-sm font-medium">Commission Paid</div>
                    <div class="text-3xl font-bold text-purple-600">৳ ${stats.commissionPaid.toLocaleString()}</div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="text-slate-500 text-sm font-medium">Orders Processed</div>
                    <div class="text-3xl font-bold text-slate-800">${stats.visits}</div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="text-slate-500 text-sm font-medium">Active Agents</div>
                    <div class="text-3xl font-bold text-blue-600">${stats.activeAgents} <span class="text-lg text-slate-400">/ ${stats.totalAgents}</span></div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 slide-in">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
                     <h3 class="font-bold mb-4">Sales by Location</h3>
                     <canvas id="locChart"></canvas>
                </div>
                 <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 class="font-bold mb-4">Top Performing Medicines</h3>
                    <canvas id="topProdChart"></canvas>
                </div>
            </div>
        `;

        // Colorful colors for charts
        const chartColors = [
            '#ef4444', '#f97316', '#eab308', '#22c55e',
            '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
        ];

        // Location Chart - Colorful bars
        new Chart(document.getElementById('locChart'), {
            type: 'bar',
            data: {
                labels: Object.keys(stats.locStats),
                datasets: [{
                    label: 'Sales (৳)',
                    data: Object.values(stats.locStats),
                    backgroundColor: chartColors.slice(0, Object.keys(stats.locStats).length),
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });

        // Product Chart - Colorful doughnut with actual data
        const logs = await db.getLogs();
        const productSales = {};
        logs.forEach(l => {
            productSales[l.product] = (productSales[l.product] || 0) + (l.sale || 0);
        });
        const sortedProducts = Object.entries(productSales)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        new Chart(document.getElementById('topProdChart'), {
            type: 'doughnut',
            data: {
                labels: sortedProducts.map(p => p[0]),
                datasets: [{
                    label: 'Sales (৳)',
                    data: sortedProducts.map(p => p[1]),
                    backgroundColor: ['#3b82f6', '#ef4444', '#22c55e', '#f97316', '#8b5cf6', '#06b6d4']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });

    } else if (view === 'agents') {
        const users = await db.getUsers();
        container.innerHTML = `
            <h2 class="text-2xl font-bold mb-6">Agent Management</h2>
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden slide-in">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr><th class="p-4">Name</th><th class="p-4">Email</th><th class="p-4">Status</th><th class="p-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${users.filter(u => u.role === 'agent').map(u => `
                            <tr>
                                <td class="p-4 font-semibold">${u.name}</td>
                                <td class="p-4 text-slate-600">${u.email}</td>
                                <td class="p-4"><span class="px-2 py-1 rounded text-xs font-bold ${u.status === 'active' ? 'bg-green-100 text-green-700' : (u.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700')} uppercase">${u.status}</span></td>
                                <td class="p-4 text-right">
                                    <button onclick="editAgent(${u.id})" class="text-blue-500 mr-3">Edit</button>
                                    ${u.status !== 'active' ? `<button onclick="setStatus(${u.id}, 'active')" class="text-green-600 font-bold mr-3">Approve</button>` : `<button onclick="setStatus(${u.id}, 'denied')" class="text-red-600">Deny</button>`}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

    } else if (view === 'doctors') {
        const doctors = await db.getDoctors();
        container.innerHTML = `
            <div class="flex justify-between items-center slide-in mb-6">
                <h2 class="text-2xl font-bold">Doctor Management</h2>
                <button onclick="addDoctorModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"><i class="fas fa-plus"></i> Add Doctor</button>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden slide-in">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr><th class="p-4">Name</th><th class="p-4">Hospital</th><th class="p-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${doctors.map(d => `
                            <tr>
                                <td class="p-4 font-semibold">${d.name}</td>
                                <td class="p-4 text-slate-600">${d.hospital}</td>
                                <td class="p-4 text-right"><button onclick="deleteDoctor(${d.id})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

    } else if (view === 'inventory') {
        const inv = await db.getInventory();
        const alertWidget = await renderStockPredictionAlert();

        container.innerHTML = `
            ${alertWidget}
            <div class="flex justify-between items-center slide-in mb-6">
                <h2 class="text-2xl font-bold">Inventory</h2>
                <button onclick="addInventoryModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"><i class="fas fa-plus"></i> Add Item</button>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden slide-in">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr><th class="p-4">Name</th><th class="p-4">Stock</th><th class="p-4">Price</th><th class="p-4">Status</th><th class="p-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${inv.map(i => `
                            <tr>
                                <td class="p-4 font-semibold">${i.name}</td>
                                <td class="p-4">${i.stock}</td>
                                <td class="p-4">৳ ${i.price}</td>
                                <td class="p-4"><span class="px-2 py-1 rounded text-xs font-bold ${i.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${i.status}</span></td>
                                <td class="p-4 text-right"><button onclick="deleteInventory(${i.id})" class="text-red-500"><i class="fas fa-trash"></i></button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

    } else if (view === 'analysis') {
        const logs = await db.getLogs();
        const performersTable = await renderTopPerformers();
        const locations = await db.getLocations();
        const doctors = await db.getDoctors();

        container.innerHTML = `
            <h2 class="text-2xl font-bold mb-6 slide-in">Intelligence & Analytics</h2>
            
            ${performersTable}
            
            <!-- Filter Bar -->
            <div class="bg-white rounded-xl shadow border border-slate-200 slide-in mt-6 p-4">
                <div class="flex flex-wrap gap-3 items-center">
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-slate-600">From:</label>
                        <input type="date" id="filter-start" class="border rounded px-2 py-1 text-sm">
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-slate-600">To:</label>
                        <input type="date" id="filter-end" class="border rounded px-2 py-1 text-sm">
                    </div>
                    <select id="filter-division" class="border rounded px-3 py-1 text-sm">
                        <option value="">All Divisions</option>
                        ${Object.keys(locations).map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                    <select id="filter-doctor" class="border rounded px-3 py-1 text-sm">
                        <option value="">All Doctors</option>
                        ${doctors.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
                    </select>
                    <button onclick="applyAnalyticsFilters()" class="bg-blue-600 text-white px-4 py-1 rounded text-sm font-semibold hover:bg-blue-700">
                        <i class="fas fa-filter"></i> Apply
                    </button>
                    <button onclick="resetAnalyticsFilters()" class="bg-slate-200 text-slate-700 px-4 py-1 rounded text-sm font-semibold hover:bg-slate-300">
                        <i class="fas fa-undo"></i> Reset
                    </button>
                </div>
                <div id="filter-summary" class="mt-2 text-xs text-slate-500"></div>
            </div>
            
            <div class="bg-white rounded-xl shadow border border-slate-200 slide-in mt-4">
                <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 class="font-bold">Activity Feed & Feedback</h3>
                    <span id="log-count" class="text-xs text-slate-500">${logs.length} records</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-slate-50 text-slate-500 text-xs uppercase">
                            <tr><th class="p-4">Date</th><th class="p-4">Agent</th><th class="p-4">Details</th><th class="p-4">Loc</th><th class="p-4">Feedback/Notes</th><th class="p-4">Sale</th></tr>
                        </thead>
                        <tbody id="analytics-table-body" class="divide-y divide-slate-100">
                            ${logs.slice(0, 20).map(l => `
                                <tr>
                                    <td class="p-4 text-xs w-32">${new Date(l.time).toLocaleDateString()}</td>
                                    <td class="p-4 text-xs font-bold">${l.agent}</td>
                                    <td class="p-4 text-sm">${l.product} x${l.qty} (${l.doctor})</td>
                                    <td class="p-4 text-xs text-slate-500">${l.division}</td>
                                    <td class="p-4 text-sm text-slate-600 italic">"${l.feedback || 'No notes'}"</td>
                                    <td class="p-4 text-sm font-semibold">৳ ${l.sale || 0}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Store logs for filtering
        window.allLogs = logs;

        // Filter functions
        window.applyAnalyticsFilters = () => {
            const startDate = document.getElementById('filter-start').value;
            const endDate = document.getElementById('filter-end').value;
            const division = document.getElementById('filter-division').value;
            const doctor = document.getElementById('filter-doctor').value;

            let filtered = [...window.allLogs];

            if (startDate) {
                filtered = filtered.filter(l => new Date(l.time) >= new Date(startDate));
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59);
                filtered = filtered.filter(l => new Date(l.time) <= end);
            }
            if (division) {
                filtered = filtered.filter(l => l.division === division);
            }
            if (doctor) {
                filtered = filtered.filter(l => l.doctor === doctor);
            }

            // Update table
            const tbody = document.getElementById('analytics-table-body');
            tbody.innerHTML = filtered.slice(0, 50).map(l => `
                <tr>
                    <td class="p-4 text-xs w-32">${new Date(l.time).toLocaleDateString()}</td>
                    <td class="p-4 text-xs font-bold">${l.agent}</td>
                    <td class="p-4 text-sm">${l.product} x${l.qty} (${l.doctor})</td>
                    <td class="p-4 text-xs text-slate-500">${l.division}</td>
                    <td class="p-4 text-sm text-slate-600 italic">"${l.feedback || 'No notes'}"</td>
                    <td class="p-4 text-sm font-semibold">৳ ${l.sale || 0}</td>
                </tr>
            `).join('') || '<tr><td colspan="6" class="p-4 text-center text-slate-500">No records match filters</td></tr>';

            // Update count and summary
            document.getElementById('log-count').textContent = `${filtered.length} records`;
            const totalSales = filtered.reduce((sum, l) => sum + (l.sale || 0), 0);
            document.getElementById('filter-summary').textContent = `Showing ${Math.min(filtered.length, 50)} of ${filtered.length} records | Total Sales: ৳ ${totalSales.toLocaleString()}`;
        };

        window.resetAnalyticsFilters = () => {
            document.getElementById('filter-start').value = '';
            document.getElementById('filter-end').value = '';
            document.getElementById('filter-division').value = '';
            document.getElementById('filter-doctor').value = '';
            document.getElementById('filter-summary').textContent = '';
            router('analysis');
        };
    }
};

// =============================================================================
// ADMIN ACTIONS
// =============================================================================

window.addDoctorModal = () => {
    renderModal('Add New Doctor', [
        { label: 'Doctor Name', name: 'name' },
        { label: 'Hospital', name: 'hospital' },
        { label: 'Mobile', name: 'mobile' }
    ], async (data) => {
        await db.addDoctor(data);
        router('doctors');
    });
};

window.deleteDoctor = async (id) => {
    if (confirm('Delete?')) {
        await db.deleteDoctor(id);
        router('doctors');
    }
};

window.addInventoryModal = () => {
    renderModal('Add Medicine', [
        { label: 'Name', name: 'name' },
        { label: 'Price', name: 'price', type: 'number' },
        { label: 'Stock', name: 'stock', type: 'number' }
    ], async (data) => {
        await db.updateInventory({ ...data, status: 'In Stock', category: 'General' });
        router('inventory');
    });
};

window.deleteInventory = async (id) => {
    if (confirm('Delete?')) {
        await db.deleteInventory(id);
        router('inventory');
    }
};

window.setStatus = async (id, status) => {
    await db.updateUser(id, { status });
    router('agents');
    showToast(`User ${status}`);
};

window.editAgent = (id) => {
    db.getUsers().then(users => {
        const u = users.find(x => x.id === id);
        if (!u) return;
        renderModal('Edit Agent', [{ label: 'Full Name', name: 'name', value: u.name }], async (data) => {
            await db.updateUser(id, { name: data.name });
            router('agents');
            showToast('Agent Name Updated');
        });
    });
};

// =============================================================================
// AGENT VIEW
// =============================================================================

const renderAgent = async (user, range = 'today') => {
    const locations = await db.getLocations();
    const inv = await db.getInventory();
    const doctors = await db.getDoctors();
    const stats = await db.getAgentStats(user.name, range);

    const rangeLabels = { 'today': "Today's", 'week': 'This Week\'s', 'month': 'This Month\'s' };

    app.innerHTML = `
        <div class="min-h-screen bg-slate-100 pb-20">
            <div class="bg-blue-600 text-white p-4 sticky top-0 z-30 shadow-md">
                <div class="flex justify-between items-center mb-2">
                    <div>
                        <h1 class="font-bold text-lg">Agent Terminal</h1>
                        <p class="text-xs text-blue-100">${user.name}</p>
                    </div>
                    <button onclick="logout()" class="text-sm bg-blue-700 px-3 py-1 rounded">Logout</button>
                </div>
                <div class="bg-blue-700 rounded-lg p-3">
                    <div class="flex justify-between items-center text-sm mb-2">
                        <select id="agentTimeFilter" onchange="updateAgentStats()" class="bg-blue-800 text-white px-2 py-1 rounded text-xs border border-blue-500">
                            <option value="today" ${range === 'today' ? 'selected' : ''}>Today</option>
                            <option value="week" ${range === 'week' ? 'selected' : ''}>This Week</option>
                            <option value="month" ${range === 'month' ? 'selected' : ''}>This Month</option>
                        </select>
                        <span class="font-bold text-yellow-300">Comm: ৳ ${stats.totalComm.toLocaleString()}</span>
                    </div>
                    <div class="text-center">
                        <span class="text-2xl font-bold">৳ ${stats.totalSale.toLocaleString()}</span>
                        <span class="text-xs text-blue-200 ml-2">${rangeLabels[range]} Sales</span>
                    </div>
                </div>
            </div>

            <div class="p-4 space-y-4 max-w-lg mx-auto">
                <div class="bg-white p-4 rounded-xl shadow-sm">
                    <select id="divisionSelect" class="w-full p-2 mb-2 border rounded bg-slate-50">
                        <option value="">Division</option>
                        ${Object.keys(locations).map(d => `<option>${d}</option>`).join('')}
                    </select>
                    <select id="districtSelect" class="w-full p-2 border rounded bg-slate-50" disabled>
                        <option>District</option>
                    </select>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div class="flex border-b border-slate-100">
                        <button onclick="setTab('manual')" id="btn-manual" class="flex-1 py-3 text-sm font-semibold border-b-2">Manual</button>
                        <button onclick="setTab('smart')" id="btn-smart" class="flex-1 py-3 text-sm font-semibold border-b-2">Smart AI</button>
                        <button onclick="setTab('history')" id="btn-history" class="flex-1 py-3 text-sm font-semibold border-b-2">History</button>
                    </div>
                    <div class="p-5 min-h-[300px]">
                        <div id="tab-manual" class="space-y-4">
                            <select id="m-doc" class="w-full p-3 border rounded">
                                <option value="">Select Doctor</option>
                                ${doctors.map(d => `<option value="${d.name}">${d.name} (${d.hospital})</option>`).join('')}
                            </select>
                            <select id="m-prod" class="w-full p-3 border rounded">
                                <option value="">Select Medicine</option>
                                ${inv.map(i => `<option value="${i.name}">${i.name} (৳${i.price})</option>`).join('')}
                            </select>
                            <input type="number" id="m-qty" class="w-full p-3 border rounded" placeholder="Quantity">
                            <textarea id="m-feedback" class="w-full p-3 border rounded h-20" placeholder="Feedback / Notes (Optional)"></textarea>
                            <button onclick="submitManual()" class="w-full bg-blue-600 text-white font-bold py-3 rounded shadow hover:bg-blue-700">Submit Log</button>
                        </div>
                        <div id="tab-smart" class="hidden">
                            <p class="text-xs text-slate-500 mb-2">Try: "Sold 10 Napa to Dr. Hasan"</p>
                            <textarea id="smart-in" class="w-full p-3 border rounded mb-4 h-32" placeholder="Type here..."></textarea>
                            <button onclick="submitSmart()" class="w-full bg-purple-600 text-white font-bold py-3 rounded shadow">Process</button>
                        </div>
                        <div id="tab-history" class="hidden h-[300px] overflow-y-auto">
                            <table class="w-full text-left text-sm">
                                <thead>
                                    <tr class="text-slate-500 border-b">
                                        <th class="pb-2">Details</th>
                                        <th class="pb-2 text-right">Comm.</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y">
                                    ${stats.logs.map(l => `
                                        <tr>
                                            <td class="py-2">
                                                <div>${l.product} x${l.qty}</div>
                                                <div class="text-xs text-slate-400">${l.doctor} (${l.district})</div>
                                            </td>
                                            <td class="py-2 text-right font-medium text-green-600">+৳${l.comm || 0}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('divisionSelect').addEventListener('change', (e) => {
        const list = locations[e.target.value];
        const dist = document.getElementById('districtSelect');
        dist.innerHTML = '<option>District</option>' + (list ? list.map(l => `<option>${l}</option>`).join('') : '');
        dist.disabled = !list;
    });

    window.setTab = (t) => {
        ['manual', 'smart', 'history'].forEach(x => {
            document.getElementById(`btn-${x}`).className = `flex-1 py-3 text-sm font-semibold border-b-2 ${x === t ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-slate-500 border-transparent'}`;
            document.getElementById(`tab-${x}`).classList.toggle('hidden', x !== t);
        });
    };
    setTab('manual');

    // Time filter handler for agent stats
    window.updateAgentStats = () => {
        const range = document.getElementById('agentTimeFilter').value;
        renderAgent(user, range);
    };

    window.submitManual = async () => {
        const doctor = document.getElementById('m-doc').value;
        const product = document.getElementById('m-prod').value;
        const qty = document.getElementById('m-qty').value;
        const feedback = document.getElementById('m-feedback').value;
        const div = document.getElementById('divisionSelect').value;
        const dist = document.getElementById('districtSelect').value;

        if (!doctor || !product || !qty) return showToast('Fill all fields', 'error');
        if (!div || div === 'Division') return showToast('Select Division', 'error');

        await db.addLog({ doctor, product, qty, feedback, division: div, district: dist, sentiment: 'Neutral' });
        showToast('Success');
        renderAgent(user);
    };

    window.submitSmart = async () => {
        const text = document.getElementById('smart-in').value.trim();
        if (!text) return showToast('Please enter some text', 'error');

        const textLower = text.toLowerCase();

        // Extract feedback/notes
        const noteMatch = text.match(/[Nn]ote[s]?[:\s]+(.+)/);
        const feedback = noteMatch ? noteMatch[1].trim() : '';

        // Number word to digit mapping
        const wordToNum = {
            'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
            'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
            'eleven': 11, 'twelve': 12, 'fifteen': 15, 'twenty': 20,
            'twenty-five': 25, 'thirty': 30, 'forty': 40, 'fifty': 50,
            'hundred': 100, 'a dozen': 12, 'dozen': 12
        };

        // Try to find quantity - first check for word numbers, then digits
        let qty = null;
        for (const [word, num] of Object.entries(wordToNum)) {
            if (textLower.includes(word)) {
                qty = num;
                break;
            }
        }
        if (!qty) {
            const digitMatch = text.match(/(\d+)/);
            qty = digitMatch ? parseInt(digitMatch[1]) : null;
        }

        // Find product - try exact match first, then partial/fuzzy match
        let pMatch = inv.find(i => textLower.includes(i.name.toLowerCase()));

        // If no exact match, try partial matching (first word of product name)
        if (!pMatch) {
            pMatch = inv.find(i => {
                const firstName = i.name.split(' ')[0].toLowerCase();
                return textLower.includes(firstName) && firstName.length > 2;
            });
        }

        // Try even looser matching - check if any significant word matches
        if (!pMatch) {
            const words = textLower.split(/\s+/);
            pMatch = inv.find(i => {
                const prodWords = i.name.toLowerCase().split(/[\s\/]+/);
                return prodWords.some(pw => pw.length > 2 && words.some(w => w.includes(pw) || pw.includes(w)));
            });
        }

        // Find doctor - check for "Dr." pattern or match from doctor list
        let docName = 'Unknown';
        const dMatch = doctors.find(d => {
            const docNameLower = d.name.toLowerCase();
            const shortName = docNameLower.replace('dr. ', '').split(' ')[0];
            return textLower.includes(docNameLower) || textLower.includes(shortName);
        });

        if (dMatch) {
            docName = dMatch.name;
        } else {
            // Try to extract doctor name from patterns like "Dr. Khan", "doctor Rahman"
            const drPattern = text.match(/[Dd]r\.?\s*([A-Za-z]+(?:\s+[A-Za-z]+)?)/);
            const docPattern = text.match(/[Dd]octor\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/);
            if (drPattern) docName = 'Dr. ' + drPattern[1];
            else if (docPattern) docName = 'Dr. ' + docPattern[1];
        }

        // Determine sentiment from text
        let sentiment = 'Neutral';
        const positiveWords = ['happy', 'great', 'good', 'excellent', 'satisfied', 'pleased', 'love', 'best', 'amazing'];
        const negativeWords = ['unhappy', 'bad', 'poor', 'complaint', 'issue', 'problem', 'angry', 'disappointed'];

        if (positiveWords.some(w => textLower.includes(w))) sentiment = 'Positive';
        else if (negativeWords.some(w => textLower.includes(w))) sentiment = 'Negative';

        // Validate required fields
        if (!pMatch) {
            return showToast('Could not identify the medicine. Try including the product name clearly.', 'error');
        }
        if (!qty) {
            return showToast('Could not identify quantity. Try including a number like "10" or "twenty".', 'error');
        }

        // Submit the log
        await db.addLog({
            product: pMatch.name,
            qty: qty,
            doctor: docName,
            sentiment: sentiment,
            feedback: feedback || `Smart AI entry: ${text.substring(0, 50)}...`,
            division: document.getElementById('divisionSelect').value || 'Dhaka',
            district: document.getElementById('districtSelect').value || 'Dhaka'
        });

        showToast(`✓ Logged: ${qty}x ${pMatch.name} to ${docName}`);
        document.getElementById('smart-in').value = '';
        renderAgent(user);
    };
};

// =============================================================================
// INITIALIZE APPLICATION
// =============================================================================

render();
