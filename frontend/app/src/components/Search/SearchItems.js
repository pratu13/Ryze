import React from 'react'

const SearchItemType =  {
    COURSE: "course",
    ASSIGNMENT: "assigment",
    ANNOUNCEMENT: "announcement"
}

const CourseItem = ({course}) => {
    return (
        <>
            <div>Course</div>
        </>
    );
}

const AssignmentItem = ({assignment}) => {
    return (
        <>
             <div>Assignment</div>
        </>
    );
}

const AnnouncementItem = ({announcement}) => {
    return (
        <>
             <div>Announcement</div>
        </>
    );
}

const SearchItem = ({type, data}) => {
  return (
      <>
          {(() => {
             switch (type) {
                case SearchItemType.COURSE:
                    return (
                        <>
                           <CourseItem/>
                        </>
                      );
                case SearchItemType.ASSIGNMENT:
                    return (
                        <>
                           <AssignmentItem/>
                        </>
                        );
                case SearchItemType.ANNOUNCEMENT:
                    return (
                        <>
                           <AnnouncementItem/>
                        </>
                    );
                default: return <div>SearchItem</div>
            }
          })() }
    </>
  )
}

const SearchItems = ({data}) => {
    return (
        <SearchItem type={SearchItemType.COURSE}></SearchItem>
  );
}




export default SearchItems