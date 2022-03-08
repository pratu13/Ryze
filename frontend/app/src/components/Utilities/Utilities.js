import Admin from "../../assets/admin.png"
import Student from "../../assets/student.png"
import Teacher from "../../assets/teacher.png"

export const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;

export const Segments = { HOME: "Home", ASSIGNMENTS: "Assignments", MODULES: "Modules", FILES: "Files", ANNOUNCEMENT: "Announcements", SYLLABUS: "Syllabus" }


export const Subjects = {
    MATH: {
        name: "Maths 101",
        color: "#7DFC94"
    },
    FINITE: {
        name: "Finite 101",
        color: "#58C1FE"
    },
}

export const UserType = {
    ADMIN: {
        title: "Admin",
        img: Admin
    },
    STUDENT: {
        title: "Student",
        img: Student 
    },
    TEACHER: {
        title: "Teacher",
        img: Teacher
    },
    NOROLE: {
        title: "",
        img: ""
    }
}

export const SampleAssignmentsData = {
    "1" : {
        title: "Assignment 1",
        subject: Subjects.MATH,
        due: "2022-02-25",
        completed: true
    },
    "2" : {
        title: "Assignment 1",
        subject: Subjects.FINITE,
        due: "2022-02-25",
        completed: false
    },
    "3": {
        title: "Assignment 2",
        subject: Subjects.MATH,
        due: "2022-04-10",
        completed: false
    }
}

export const SampleCourses = {
  "1": {
    title: "Maths 101",
    color: "#7DFC94"
  },
  "2": {
    title: "Finite 101",
    color: "#58C1FE"
  },
  "3": {
    title: "Maths 101",
    color: "#7DFC94"
  },
  "4": {
    title: "Finite 101",
    color: "#58C1FE"
  }
}

export const SampleAnnouncementsData = {
    "1":  {
        header: "This is some stupid announcement",
        time: "02/22/22",
        subject: Subjects.MATH,
        description: "Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet. Whole every miles as tiled at seven or. Wished he entire esteem mr oh by. Possible bed you pleasure civility boy elegance ham. He prevent request by if in pleased. Picture too and concern has was comfort. Ten difficult resembled eagerness nor. Same park bore on be. Warmth his law design say are person. Pronounce suspected in belonging conveying ye repulsive. "
      },
      "2": {
        header: "Announcement 2",
        time: "02/22/22",
        subject: Subjects.MATH,
        description: "This is a stupid description"
      },
      "3":  {
        header: "Announcement 3",
        time: "02/22/22",
        subject: Subjects.FINITE,
        description: "This is a stupid description"
      },
      "4": {
        header: "This is some another stupid announcement",
        time: "02/22/22",
        subject: Subjects.MATH,
        description: "Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet. Whole every miles as tiled at seven or. Wished he entire esteem mr oh by. Possible bed you pleasure civility boy elegance ham. He prevent request by if in pleased. Picture too and concern has was comfort. Ten difficult resembled eagerness nor. Same park bore on be. Warmth his law design say are person. Pronounce suspected in belonging conveying ye repulsive. "
    },
      
    "5":  {
        header: "Announcement 4",
        time: "02/22/22",
        subject: Subjects.MATH,
        description: "This is a stupid description"
      },
      "6":  {
        header: "Announcement 5",
        time: "02/22/22",
        subject: Subjects.FINITE,
        description: "This is a stupid description"
      },
      "7":  {
        header: "This is some stupid announcement",
        time: "02/22/22",
        subject: Subjects.MATH,
        description: "Examine she brother prudent add day ham. Far stairs now coming bed oppose hunted become his. You zealously departure had procuring suspicion. Books whose front would purse if be do decay. Quitting you way formerly disposed perceive ladyship are. Common turned boy direct and yet. Whole every miles as tiled at seven or. Wished he entire esteem mr oh by. Possible bed you pleasure civility boy elegance ham. He prevent request by if in pleased. Picture too and concern has was comfort. Ten difficult resembled eagerness nor. Same park bore on be. Warmth his law design say are person. Pronounce suspected in belonging conveying ye repulsive. "
      },
      "8": {
        header: "Announcement 6",
        time: "02/22/22",
        subject: Subjects.MATH,
        description: "This is a stupid description"
      },
      "9": {
        header: "Announcement 7",
        time: "02/22/22",
        subject: Subjects.FINITE,
        description: "This is a stupid description"
      }
}