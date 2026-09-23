const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const userType = document.getElementById("userType").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        // Student Login
        if (
            userType === "student" &&
            email === "student@hostel.com" &&
            password === "student123"
        ) {
            message.textContent = "Student login successful!";
            message.style.color = "green";

            localStorage.setItem("currentStudentId", "STU001");
          localStorage.setItem("currentStudentName", "Rahul Kumar");
          localStorage.setItem("currentStudentEmail", email);
        localStorage.setItem("currentStudentPhone", "9876543210");
            setTimeout(function() {
                window.location.href = "student-dashboard.html";
            }, 1000);
        }

        // Warden Login
        else if (
            userType === "warden" &&
            email === "admin@hostel.com" &&
            password === "admin123"
        ) {
            message.textContent = "Warden login successful!";
            message.style.color = "green";

            setTimeout(function() {
                window.location.href = "warden-dashboard.html";
            }, 1000);
        }

        // Invalid Login
        else {
            message.textContent = "Invalid ID/Email or Password.";
            message.style.color = "red";
        }
    });
}

// ==============================
// Student Management
// ==============================

// Show Student Form
function showStudentForm() {
    const form = document.getElementById("studentForm");

    if (form) {
        form.style.display = "block";
    }
}


// Hide Student Form
function hideStudentForm() {
    const form = document.getElementById("studentForm");

    if (form) {
        form.style.display = "none";
    }
}
// Currently editing student
let editingStudentId = null;

// Add / Update Student
const addStudentForm = document.getElementById("addStudentForm");

if (addStudentForm) {

    addStudentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("studentName").value.trim();

        const id =
            document.getElementById("studentId").value.trim();

        const email =
            document.getElementById("studentEmail").value.trim();

        const room =
            document.getElementById("studentRoom").value.trim();

        let students =
            JSON.parse(localStorage.getItem("students")) || [];

        // Check if student already exists
        const existingIndex = students.findIndex(function(student) {
            return student.id === id;
        });
        // Prevent duplicate Student ID
if (
    existingIndex !== -1 &&
    editingStudentId === null
) {
    alert("Student ID already exists!");
    return;
}
      

        const student = {
            name: name,
            id: id,
            email: email,
            room: room
        };

        // Update existing student
        if (existingIndex !== -1) {

            students[existingIndex] = student;

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            alert("Student updated successfully!");

        }
        if (existingIndex !== -1) {

    students[existingIndex] = student;

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Student updated successfully!");
    editingStudentId = null;
}

        // Add new student
        else {

            students.push(student);

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            alert("Student added successfully!");
        }

        // Refresh student table
        const tableBody =
            document.getElementById("studentTableBody");

        tableBody.innerHTML = "";

        loadStudents();

        // Clear form
        addStudentForm.reset();

        // Hide form
        hideStudentForm();
    });
}


// Delete Student
function deleteStudent(button) {
    const row = button.parentElement.parentElement;
    const studentId = row.cells[0].textContent.trim();

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students = students.filter(function(student) {
        return student.id !== studentId;
    });

    localStorage.setItem("students", JSON.stringify(students));

    row.remove();

    alert("Student deleted successfully!");
}


function editStudent(button) {

    const row =
        button.parentElement.parentElement;

    const studentId =
        row.cells[0].textContent.trim();
       editingStudentId = studentId;

    const name =
        row.cells[1].textContent.trim();

    const email =
        row.cells[2].textContent.trim();

    const room =
        row.cells[3].textContent.trim();


    document.getElementById("studentName").value =
        name;

    document.getElementById("studentId").value =
        studentId;

    document.getElementById("studentEmail").value =
        email;

    document.getElementById("studentRoom").value =
        room;


    showStudentForm();
}

// Search Student
function searchStudent() {

    const searchValue = document
        .getElementById("studentSearch")
        .value
        .toLowerCase();

    const rows = document
        .getElementById("studentTableBody")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const rowText = rows[i].textContent.toLowerCase();

        if (rowText.includes(searchValue)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

    // Load saved students
function loadStudents() {

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const tableBody = document.getElementById("studentTableBody");

    if (!tableBody) {
        return;
    }

    students.forEach(function(student) {

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.room}</td>
         <td>
    <button onclick="editStudent(this)">
        ✏️ Edit
    </button>

    <button onclick="deleteStudent(this)">
        🗑️ Delete
    </button>
</td>
        `;

        tableBody.appendChild(newRow);
    });
}
       // Load students when page opens
if (document.getElementById("studentTableBody")) {
    loadStudents();
}

// ==============================
// Room Management
// ==============================

// Currently editing room
let editingRoomNumber = null;


// Show Room Form
function showRoomForm() {

    const form =
        document.getElementById("roomForm");

    if (form) {
        form.style.display = "block";
    }
}


// Hide Room Form
function hideRoomForm() {

    const form =
        document.getElementById("roomForm");

    if (form) {
        form.style.display = "none";
    }
}


// Add / Update Room
const addRoomForm =
    document.getElementById("addRoomForm");

if (addRoomForm) {

    addRoomForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const roomNumber =
            document.getElementById("roomNumber").value.trim();

        const capacity =
            Number(
                document.getElementById("roomCapacity").value
            );

        const occupied =
            Number(
                document.getElementById("occupiedBeds").value
            );
            // Validate room details
if (
    roomNumber === "" ||
    capacity <= 0 ||
    occupied < 0
) {
    alert("Please enter valid room details.");
    return;
}


        // Validation
        if (occupied > capacity) {

            alert(
                "Occupied beds cannot be greater than room capacity."
            );

            return;
        }


        const available =
            capacity - occupied;


        const status =
            available === 0
                ? "🔴 Full"
                : "🟢 Available";


        let rooms =
            JSON.parse(
                localStorage.getItem("rooms")
            ) || [];


            // Prevent duplicate Room Number
if (
    rooms.some(function(room) {
        return room.roomNumber === roomNumber;
    }) &&
    editingRoomNumber === null
) {
    alert("Room number already exists!");
    return;
}


        const room = {

            roomNumber: roomNumber,

            capacity: capacity,

            occupied: occupied,

            available: available,

            status: status

        };


        // UPDATE EXISTING ROOM
        if (editingRoomNumber !== null) {

            const index =
                rooms.findIndex(function(room) {

                    return room.roomNumber ===
                        editingRoomNumber;

                });


            if (index !== -1) {

                rooms[index] = room;

                alert(
                    "Room updated successfully!"
                );
            }

            editingRoomNumber = null;

        }


        // ADD NEW ROOM
        else {

            rooms.push(room);

            alert(
                "Room added successfully!"
            );
        }


        // Save rooms
        localStorage.setItem(
            "rooms",
            JSON.stringify(rooms)
        );


        // Refresh table
        const tableBody =
            document.getElementById(
                "roomTableBody"
            );

        tableBody.innerHTML = "";

        loadRooms();


        // Reset form
        addRoomForm.reset();

        hideRoomForm();

    });
}


// Edit Room
function editRoom(button) {

    const row =
        button.parentElement.parentElement;


    const roomNumber =
        row.cells[0].textContent.trim();

    const capacity =
        row.cells[1].textContent.trim();

    const occupied =
        row.cells[2].textContent.trim();


    document.getElementById(
        "roomNumber"
    ).value = roomNumber;


    document.getElementById(
        "roomCapacity"
    ).value = capacity;


    document.getElementById(
        "occupiedBeds"
    ).value = occupied;


    // Remember room being edited
    editingRoomNumber =
        roomNumber;


    showRoomForm();
}


// Delete Room
function deleteRoom(button) {

    const row =
        button.parentElement.parentElement;


    const roomNumber =
        row.cells[0].textContent.trim();


    let rooms =
        JSON.parse(
            localStorage.getItem("rooms")
        ) || [];


    rooms =
        rooms.filter(function(room) {

            return room.roomNumber !==
                roomNumber;

        });


    localStorage.setItem(
        "rooms",
        JSON.stringify(rooms)
    );


    row.remove();


    alert(
        "Room deleted successfully!"
    );
}


// Search Room
function searchRoom() {

    const searchValue =
        document.getElementById(
            "roomSearch"
        ).value.toLowerCase();


    const rows =
        document.getElementById(
            "roomTableBody"
        ).getElementsByTagName("tr");


    for (
        let i = 0;
        i < rows.length;
        i++
    ) {

        const roomNumber =
            rows[i]
                .cells[0]
                .textContent
                .toLowerCase();


        if (
            roomNumber.includes(
                searchValue
            )
        ) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";
        }
    }
}
// Search Leave
function searchLeave() {

    const searchValue =
        document.getElementById("leaveSearch")
        .value
        .toLowerCase();

    const rows =
        document.getElementById("leaveTableBody")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const rowText =
            rows[i].textContent.toLowerCase();

        if (rowText.includes(searchValue)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";
        }
    }
} 

// Load Saved Rooms
function loadRooms() {

    const rooms =
        JSON.parse(localStorage.getItem("rooms")) || [];

    const tableBody =
        document.getElementById("roomTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    rooms.forEach(function(room) {

        const newRow =
            document.createElement("tr");

        newRow.innerHTML = `
            <td>${room.roomNumber}</td>
            <td>${room.capacity}</td>
            <td>${room.occupied}</td>
            <td>${room.available}</td>
            <td>${room.status}</td>
            <td>
                <button onclick="editRoom(this)">
                    ✏️ Edit
                </button>

                <button onclick="deleteRoom(this)">
                    🗑️ Delete
                </button>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}



// Load rooms when page opens
if (
    document.getElementById(
        "roomTableBody"
    )
) {

    loadRooms();
}


// ==============================
// Complaint Management
// ==============================

function resolveComplaint(button) {

    const row = button.parentElement.parentElement;

    const status = row.querySelector(".complaint-status");

    // Get complaint ID from first column
    const complaintId = row.cells[0].textContent.trim();

    // Get complaints from localStorage
    let complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    // Convert C001 into index 0, C002 into index 1, etc.
    const index =
        Number(complaintId.substring(1)) - 1;

    // Update complaint status
    if (complaints[index]) {

        complaints[index].status = "🟢 Resolved";

        // Save updated complaints
        localStorage.setItem(
            "complaints",
            JSON.stringify(complaints)
        );
    }

    // Update screen
    status.textContent = "🟢 Resolved";
    status.style.color = "green";

    button.textContent = "✅ Resolved";
    button.disabled = true;

    alert("Complaint resolved successfully!");
}


// Search Complaint
function searchComplaint() {

    const searchValue =
        document.getElementById("complaintSearch")
        .value
        .toLowerCase();

    const rows =
        document.getElementById("complaintTableBody")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const rowText =
            rows[i].textContent.toLowerCase();

        if (rowText.includes(searchValue)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }
    }
}

// Load Complaints for Warden
function loadWardenComplaints() {

    const complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    const tableBody =
        document.getElementById("complaintTableBody");

    if (!tableBody) {
        return;
    }

    complaints.forEach(function(complaint, index) {

        const newRow =
            document.createElement("tr");

        newRow.innerHTML = `
            <td>C${String(index + 1).padStart(3, "0")}</td>

            <td>${complaint.studentId}</td>

            <td>${complaint.studentName}</td>

            <td>${complaint.subject}</td>

            <td>${complaint.description}</td>

            <td class="complaint-status">
                ${complaint.status}
            </td>

            <td>
                <button
                    class="resolve-btn"
                    onclick="resolveComplaint(this)">
                    ✅ Resolve
                </button>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}


// Load complaints when Warden Complaint page opens
if (document.getElementById("complaintTableBody")) {
    loadWardenComplaints();
}

// ==============================
// Student Leave Request
// ==============================

const leaveRequestForm =
    document.getElementById("leaveRequestForm");

if (leaveRequestForm) {

    leaveRequestForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const fromDate =
            document.getElementById("fromDate").value;

        const toDate =
            document.getElementById("toDate").value;

        const reason =
            document.getElementById("leaveReason").value.trim();

        const message =
            document.getElementById("leaveMessage");

        // Check required fields
        if (
            fromDate === "" ||
            toDate === "" ||
            reason === ""
        ) {
            message.textContent =
                "Please fill all leave details.";

            message.style.color = "red";

            return;
        }

        // Check date
        if (toDate < fromDate) {

            message.textContent =
                "To Date cannot be before From Date.";

            message.style.color = "red";

            return;
        }

        // Current student information
        const studentId =
            localStorage.getItem("currentStudentId") || "STU001";

        const studentName =
            localStorage.getItem("currentStudentName") || "Rahul Kumar";

        // Get existing leaves
        let leaves =
            JSON.parse(localStorage.getItem("leaves")) || [];

        // Create new leave
        const leave = {
            studentId: studentId,
            studentName: studentName,
            fromDate: fromDate,
            toDate: toDate,
            reason: reason,
            status: "🟡 Pending"
        };

        // Add leave
        leaves.push(leave);

        // Save leave
        localStorage.setItem(
            "leaves",
            JSON.stringify(leaves)
        );

        // Add row if table exists
        const tableBody =
            document.getElementById("myLeaveTableBody");

        if (tableBody) {

            const newRow =
                document.createElement("tr");

            newRow.innerHTML = `
                <td>${fromDate}</td>
                <td>${toDate}</td>
                <td>${reason}</td>
                <td class="my-leave-status">
                    🟡 Pending
                </td>
            `;

            tableBody.appendChild(newRow);
        }

        // Clear form
        leaveRequestForm.reset();

        // Success message
        message.textContent =
            "Leave request submitted successfully!";

        message.style.color = "green";
    });
}


// Load saved leaves for Student
function loadLeaves() {

    const leaves =
        JSON.parse(localStorage.getItem("leaves")) || [];

    const tableBody =
        document.getElementById("myLeaveTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    leaves.forEach(function(leave) {

        const newRow =
            document.createElement("tr");

        newRow.innerHTML = `
            <td>${leave.fromDate || "-"}</td>
            <td>${leave.toDate || "-"}</td>
            <td>${leave.reason || "-"}</td>
            <td class="my-leave-status">
                ${leave.status || "🟡 Pending"}
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}


// Load leaves when Student Leave page opens
if (document.getElementById("myLeaveTableBody")) {
    loadLeaves();
}
// Load leaves when page opens
if (document.getElementById("myLeaveTableBody")) {
    loadLeaves();
}

// Load leave requests for Warden
function loadWardenLeaves() {

    const leaves =
        JSON.parse(localStorage.getItem("leaves")) || [];

    const tableBody =
        document.getElementById("leaveTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    leaves.forEach(function(leave, index) {

        const newRow =
            document.createElement("tr");

        const studentId =
            leave.studentId || "Not Available";

        const studentName =
            leave.studentName || "Not Available";

        const fromDate =
            leave.fromDate || "-";

        const toDate =
            leave.toDate || "-";

        const reason =
            leave.reason || "-";

        const status =
            leave.status || "🟡 Pending";

        newRow.innerHTML = `
            <td>${studentId}</td>

            <td>${studentName}</td>

            <td>${fromDate}</td>

            <td>${toDate}</td>

            <td>${reason}</td>

            <td class="leave-status">
                ${status}
            </td>

            <td>
                <button
                    class="approve-btn"
                    onclick="approveLeave(${index})">
                    ✅ Approve
                </button>

                <button
                    class="reject-btn"
                    onclick="rejectLeave(${index})">
                    ❌ Reject
                </button>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}
// Approve Leave
function approveLeave(index) {

    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

    leaves[index].status = "🟢 Approved";

    localStorage.setItem("leaves", JSON.stringify(leaves));

    alert("Leave approved successfully!");

    location.reload();
}


// Reject Leave
function rejectLeave(index) {

    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

    leaves[index].status = "🔴 Rejected";

    localStorage.setItem("leaves", JSON.stringify(leaves));

    alert("Leave rejected successfully!");

    location.reload();
}
// ==============================
// Student Complaint
// ==============================

const complaintForm =
    document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const subject =
            document.getElementById("complaintSubject")
            .value
            .trim();

        const description =
            document.getElementById("complaintDescription")
            .value
            .trim();

        const message =
            document.getElementById("complaintMessage");

        const tableBody =
            document.getElementById("myComplaintTableBody");
        

            // Get existing complaints
const complaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

// Create complaint object
const studentId =
    localStorage.getItem("currentStudentId") || "STU001";

const studentName =
    localStorage.getItem("currentStudentName") || "Student";

const complaint = {
    studentId: studentId,
    studentName: studentName,
    subject: subject,
    description: description,
    status: "🟡 Pending"
};

// Add complaint to list
complaints.push(complaint);

// Save complaints in localStorage
localStorage.setItem(
    "complaints",
    JSON.stringify(complaints)
);


        // Create new row
        const newRow =
            document.createElement("tr");

        newRow.innerHTML = `
            <td>${subject}</td>

            <td>${description}</td>

            <td class="my-complaint-status">
                🟡 Pending
            </td>
        `;

        tableBody.appendChild(newRow);

        // Clear form
        complaintForm.reset();

        // Success message
        message.textContent =
            "Complaint submitted successfully!";

        message.style.color = "green";

    });
}
// ==============================
// Warden Dashboard Statistics
// ==============================

const totalStudents = document.getElementById("totalStudents");
const totalRooms = document.getElementById("totalRooms");
const availableRooms = document.getElementById("availableRooms");
const pendingLeaves = document.getElementById("pendingLeaves");

const pendingComplaints = document.getElementById("pendingComplaints");
const feePending = document.getElementById("feePending");

if (totalStudents) {

    const students = JSON.parse(localStorage.getItem("students")) || [];

    totalStudents.textContent = students.length;
}

if (totalRooms) {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    totalRooms.textContent = rooms.length;
}

if (availableRooms) {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

    let totalAvailable = 0;

    rooms.forEach(function(room) {
        totalAvailable += Number(room.available);
    });

    availableRooms.textContent = totalAvailable;
}

if (pendingLeaves) {

    const leaves =
        JSON.parse(localStorage.getItem("leaves")) || [];

    let pendingCount = 0;

    leaves.forEach(function(leave) {

        if (leave.status === "🟡 Pending") {
            pendingCount++;
        }

    });

    pendingLeaves.textContent = pendingCount;
}

if (pendingComplaints) {

    const complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    const pendingCount =
        complaints.filter(function(complaint) {
            return complaint.status === "🟡 Pending";
        }).length;

    pendingComplaints.textContent = pendingCount;
}



if (feePending) {

    const students =
        JSON.parse(localStorage.getItem("students")) || [];

    const feeRecords =
        JSON.parse(localStorage.getItem("feeRecords")) || [];

    let pendingFeeCount = 0;

    students.forEach(function(student) {

        const feeRecord = feeRecords.find(function(fee) {
            return fee.studentId === student.id;
        });

        if (!feeRecord || feeRecord.status === "Pending") {
            pendingFeeCount++;
        }
    });

    feePending.textContent = pendingFeeCount;
}


// Fee Status - Current Student
const feeStudentId = document.getElementById("feeStudentId");
const feeStudentName = document.getElementById("feeStudentName");

if (feeStudentId) {

    const studentId =
        localStorage.getItem("currentStudentId") || "STU001";

    feeStudentId.textContent = studentId;
}

if (feeStudentName) {

    const studentName =
        localStorage.getItem("currentStudentName") || "Student";

    feeStudentName.textContent = studentName;
} 

// Dynamic Last Payment
const lastPaymentElement =
    document.getElementById("lastPayment");

if (lastPaymentElement) {

    const paidAmount = 35000;

    lastPaymentElement.textContent =
        "₹" + paidAmount.toLocaleString("en-IN");
}
// Fee Amount Calculation
const totalFeeElement = document.getElementById("totalFee");
const paidAmountElement = document.getElementById("paidAmount");
const pendingAmountElement = document.getElementById("pendingAmount");

if (totalFeeElement && paidAmountElement && pendingAmountElement) {

    const totalFee = 50000;
    const paidAmount = 35000;
    const pendingAmount = totalFee - paidAmount;

    totalFeeElement.textContent = "₹" + totalFee.toLocaleString("en-IN");
    paidAmountElement.textContent = "₹" + paidAmount.toLocaleString("en-IN");
    pendingAmountElement.textContent =
        "₹" + pendingAmount.toLocaleString("en-IN");
}

// Dynamic Payment Status
const feePaymentStatus =
    document.getElementById("feePaymentStatus");

if (feePaymentStatus && pendingAmountElement) {

    const pendingAmount =
        pendingAmountElement.textContent;

    if (pendingAmount === "₹0") {

        feePaymentStatus.textContent = "🟢 Paid";
        feePaymentStatus.style.color = "green";

    } else {

        feePaymentStatus.textContent = "🟡 Pending";
        feePaymentStatus.style.color = "orange";
    }
}
// Dynamic Payment Notice
const paymentNotice = document.getElementById("paymentNotice");

if (paymentNotice && pendingAmountElement) {

    const pendingAmount =
        pendingAmountElement.textContent;

    paymentNotice.textContent =
        "Your pending hostel fee is " +
        pendingAmount +
        ". Please pay the remaining amount before the due date.";
}
// Profile - Current Student
const profileStudentName =
    document.getElementById("profileStudentName");

const profileStudentId =
    document.getElementById("profileStudentId");

if (profileStudentName) {

    const studentName =
        localStorage.getItem("currentStudentName") || "Student";

    profileStudentName.textContent = studentName;
}

if (profileStudentId) {

    const studentId =
        localStorage.getItem("currentStudentId") || "STU001";

    profileStudentId.textContent = studentId;
}
// Profile - Current Student Email
const profileStudentEmail =
    document.getElementById("profileStudentEmail");

if (profileStudentEmail) {

    const studentEmail =
        localStorage.getItem("currentStudentEmail") || "student@hostel.com";

    profileStudentEmail.textContent = studentEmail;
}
// Profile - Current Student Phone
const profileStudentPhone =
    document.getElementById("profileStudentPhone");

if (profileStudentPhone) {
    const studentPhone =
        localStorage.getItem("currentStudentPhone") || "9876543210";

    profileStudentPhone.textContent = studentPhone;
}
// Profile - Current Student Course
const profileStudentCourse =
    document.getElementById("profileStudentCourse");

if (profileStudentCourse) {
    profileStudentCourse.textContent = "B.Tech CSE";
}
// Profile - Admission Year
const profileAdmissionYear =
    document.getElementById("profileAdmissionYear");

if (profileAdmissionYear) {
    profileAdmissionYear.textContent = "2024";
}
// Profile - Room Number
const profileStudentRoom =
    document.getElementById("profileStudentRoom");

if (profileStudentRoom) {
    profileStudentRoom.textContent = "101";
}
// Profile - Bed Number
const profileStudentBed =
    document.getElementById("profileStudentBed");

if (profileStudentBed) {
    profileStudentBed.textContent = "1";
}
// Profile - Hostel Block
const profileStudentBlock =
    document.getElementById("profileStudentBlock");

if (profileStudentBlock) {
    profileStudentBlock.textContent = "Block A";
}
// Mess Management - Today's Menu

const breakfastMenu = document.getElementById("breakfastMenu");
const lunchMenu = document.getElementById("lunchMenu");
const snacksMenu = document.getElementById("snacksMenu");
const dinnerMenu = document.getElementById("dinnerMenu");

if (breakfastMenu) {
    breakfastMenu.textContent = "Poha & Tea";
}

if (lunchMenu) {
    lunchMenu.textContent = "Dal, Rice, Roti & Sabzi";
}

if (snacksMenu) {
    snacksMenu.textContent = "Samosa & Tea";
}

if (dinnerMenu) {
    dinnerMenu.textContent = "Dal, Rice, Roti & Sabzi";
}
// Mess Management - Weekly Menu

const mondayMenu = document.getElementById("mondayMenu");

if (mondayMenu) {
    mondayMenu.textContent = "Poha, Tea & Milk";
}