import Admin from "../../assets/admin.png"
import Student from "../../assets/student.png"
import Teacher from "../../assets/teacher.png"

export const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
export const randHex = () => `${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;

export const Segments = { HOME: "Home", ASSIGNMENTS: "Assignments", ANNOUNCEMENT: "Announcements", CHAT: "Chat"}

export function handleErrors(response) {
  if (response.status != 200) {
    throw response.json()
  }
  return response;
}

export const getGrade = (scores) => {
    const initialValue = 0; 
    const cumulativeScore = scores.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
    );
  const score = cumulativeScore / scores.length
  
    if (score >= 95) {
      return "A+"
    } else if (score >= 90 && score < 95) {
      return "A"
    } else if (score >= 85 && score < 90) {
      return "A-"
    } else if (score >= 80 && score < 84) {
      return "B+"
    } else if (score >= 75 && score < 80) {
      return "B"
    } else if (score >= 70 && score < 74) {
      return "B-"
    } else if (score >=65 && score < 70) {
      return "C"
    } else if (score >=60 && score < 64) {
      return "C-"
    } else if (score >=55 && score < 60) {
      return  "D"
    } else if (score >=50 && score < 55) {
      return  "E"
    } else {
      return  "F"
    }
}

export const SampleData = {
  "courses": [
      {
          "color": "#4c81e8",
          "created_by": "J Duncan",
          "description": "this is a very fun course",
          "title": "INFO - 312",
          "published_at": "Sun, 27 Mar 2022 15:07:08 GMT",
          "id": "52c59625-03de-452a-bde2-c799590b4cba"
      },
      {
          "color": "#ba0ac0",
          "created_by": "Pratyush",
          "description": "Introduction to python development",
          "title": "INFO 200",
          "published_at": "Wed, 23 Mar 2022 00:34:41 GMT",
          "id": "ec765cb9-fa23-4132-ac99-120ff1ccaab3"
      },
      {
          "color": "#4a15c9",
          "created_by": "J Duncan",
          "description": "Intro to NLP",
          "title": "LANG-454",
          "published_at": "Sun, 27 Mar 2022 01:02:16 GMT",
          "id": "8ba39510-8cbd-4bb7-a52b-e6ed39eda4b3"
      }
  ]
}


export const SampleMessageList = [
  {
    to: "jack",
    from: "self",
    text: "Hi jack"
  },
  {
    to: "self",
    from: "jack",
    text: "Hi Timothy"
  },
  {
    to: "self",
    from: "jack",
    text: "How are you doing"
  },
  {
    to: "jack",
    from: "self",
    text: "i'm doing good wbu ?"
  },
  {
    to: "self",
    from: "jack",
    text: "i'm good too. What are your plans for tonight?"
  },
]
  
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
        title: "No Role Selected",
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