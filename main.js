/**
 * The main function which calls the application. 
 * Generates employee data and analyzes name statistics for various categories.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics with name frequencies and chart data
 */
export function main(dtoIn) {
    const employees = generateEmployeeData(dtoIn);
    const dtoOut = getEmployeeChartContent(employees);
    return dtoOut;
}

/**
 * Generates random employee data based on input parameters.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {
    const names = getNameLists();
    const surnames = getSurnameList();
    const employees = [];
    const usedBirthdates = new Set();
    const dateRange = calculateDateRange(dtoIn);

    for (let i = 0; i < dtoIn.count; i++) {
        const employee = createEmployee(names, surnames, dateRange, usedBirthdates);
        employees.push(employee);
    }

    const dtoOut = employees;
    return dtoOut;
}

/**
 * Analyzes employee names and calculates frequencies for chart visualization.
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} frequencies of the employee names
 */
export function getEmployeeChartContent(employees) {
    const dtoOut = analyzeEmployeeNames(employees);
    return dtoOut;
}

/**
 * Analyzes employee data and returns name statistics.
 * @param {Array<object>} employees - Array of employee objects
 * @returns {object} An object containing name statistics and chart data
 */
function analyzeEmployeeNames(employees) {
    const nameCounts = initializeNameCounts();
    countNamesByCategory(employees, nameCounts);
    return createDtoOut(nameCounts);
}

/**
 * Initializes the structure for counting names.
 * @returns {object} Initial empty name counts by category
 */
function initializeNameCounts() {
    return {
        all: {},
        male: {},
        female: {},
        femalePartTime: {},
        maleFullTime: {}
    };
}

/**
 * Counts names by categories (all, male, female, etc.)
 * @param {Array<object>} employees - Array of employee objects
 * @param {object} nameCounts - Object to accumulate name counts
 */
function countNamesByCategory(employees, nameCounts) {
    for (const employee of employees) {
        const name = employee.name;

        nameCounts.all[name] = (nameCounts.all[name] || 0) + 1;

        if (employee.gender === "male") {
            nameCounts.male[name] = (nameCounts.male[name] || 0) + 1;
            if (employee.workload === 40) {
                nameCounts.maleFullTime[name] = (nameCounts.maleFullTime[name] || 0) + 1;
            }
        } else {
            nameCounts.female[name] = (nameCounts.female[name] || 0) + 1;
            if (employee.workload !== 40) {
                nameCounts.femalePartTime[name] = (nameCounts.femalePartTime[name] || 0) + 1;
            }
        }
    }
}

/**
 * Creates the final DTO object with name statistics and chart data.
 * @param {object} nameCounts - Object with counted names
 * @returns {object} DTO containing sorted names and chart data
 */
function createDtoOut(nameCounts) {
    return {
        names: {
            all: sortNamesObject(nameCounts.all),
            male: sortNamesObject(nameCounts.male),
            female: sortNamesObject(nameCounts.female),
            femalePartTime: sortNamesObject(nameCounts.femalePartTime),
            maleFullTime: sortNamesObject(nameCounts.maleFullTime)
        },
        chartData: {
            all: sortAndConvertToChartData(nameCounts.all),
            male: sortAndConvertToChartData(nameCounts.male),
            female: sortAndConvertToChartData(nameCounts.female),
            femalePartTime: sortAndConvertToChartData(nameCounts.femalePartTime),
            maleFullTime: sortAndConvertToChartData(nameCounts.maleFullTime)
        }
    };
}

/**
 * Converts a name dictionary into a sorted array of { label, value } objects.
 * @param {object} nameDict - Dictionary of names and their counts
 * @returns {Array<object>} Array of objects sorted by count descending
 */
function sortAndConvertToChartData(nameDict) {
    return Object.entries(nameDict)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value]) => ({ label, value }));
}

/**
 * Sorts a dictionary of names in descending order by count.
 * @param {object} nameDict - Dictionary of names and their counts
 * @returns {object} Sorted dictionary by count descending
 */
function sortNamesObject(nameDict) {
    const sortedEntries = Object.entries(nameDict).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sortedEntries);
}

/**
 * Returns lists of male and female names.
 * @returns {object} object with male and female name arrays
 */
function getNameLists() {
    return {
        male: [
            "Jan", "Petr", "Pavel", "Jiří", "Josef", "Tomáš", "Martin", "Jaroslav",
            "Miroslav", "František", "Václav", "Karel", "Milan", "David", "Michal",
            "Vratislav", "Zdeněk", "Lukáš", "Marek", "Jakub", "Ondřej", "Stanislav"
        ],
        female: [
            "Jana", "Marie", "Eva", "Anna", "Hana", "Věra", "Alena", "Lenka",
            "Petra", "Jitka", "Martina", "Kateřina", "Lucie", "Monika", "Aneta",
            "Jiřina", "Ivana", "Veronika", "Tereza", "Barbora", "Zuzana", "Michaela"
        ]
    };
}

/**
 * Returns list of surnames.
 * @returns {Array} array of surnames
 */
function getSurnameList() {
    return [
        "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera",
        "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Pokorný", "Hájek",
        "Král", "Jelínek", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal",
        "Zeman", "Kolář", "Navrátil", "Čermák", "Sýkora", "Ptáček", "Urban",
        "Krejčí", "Vaněk"
    ];
}

/**
 * Calculates date range for birthdate generation.
 * @param {object} dtoIn contains age limits
 * @returns {object} minDate and maxDate with range
 */
function calculateDateRange(dtoIn) {
    const now = new Date();
    const minDate = new Date(now);
    minDate.setFullYear(now.getFullYear() - dtoIn.age.max);

    const maxDate = new Date(now);
    maxDate.setFullYear(now.getFullYear() - dtoIn.age.min);

    return { minDate, maxDate, range: maxDate.getTime() - minDate.getTime() };
}

/**
 * Creates a single employee with random attributes.
 * @param {object} names lists of male and female names
 * @param {Array} surnames list of surnames
 * @param {object} dateRange date range for birthdate
 * @param {Set} usedBirthdates set of already used birthdates
 * @returns {object} employee object
 */
function createEmployee(names, surnames, dateRange, usedBirthdates) {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const workloads = [10, 20, 30, 40];
    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    const nameList = gender === "male" ? names.male : names.female;
    const name = nameList[Math.floor(Math.random() * nameList.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];

    const birthdate = generateUniqueBirthdate(dateRange, usedBirthdates);

    return { gender, birthdate, name, surname, workload };
}

/**
 * Generates a unique birthdate in ISO format.
 * @param {object} dateRange date range configuration
 * @param {Set} usedBirthdates set of already used birthdates
 * @returns {string} ISO formatted birthdate
 */
function generateUniqueBirthdate(dateRange, usedBirthdates) {
    let birthdateStr;

    do {
        const randomTime = dateRange.minDate.getTime() + Math.random() * dateRange.range;
        const birthdate = new Date(randomTime);
        birthdateStr = formatDateToISO(birthdate);
    } while (usedBirthdates.has(birthdateStr));

    usedBirthdates.add(birthdateStr);
    return birthdateStr;
}

/**
 * Formats date to ISO string format (YYYY-MM-DDTHH:mm:ss.sssZ).
 * @param {Date} date date object
 * @returns {string} ISO formatted date string
 */
function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}
