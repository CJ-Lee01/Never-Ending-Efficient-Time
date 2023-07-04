interface CanvasAPIPermittedCourse {
  //Copied from https://canvas.instructure.com/doc/api/courses.html#Course

  // the unique identifier for the course
  "id": number,
  // the SIS identifier for the course, if defined. This field is only included if
  // the user has permission to view SIS information.
  "sis_course_id"?: string | null,
  // the UUID of the course
  "uuid"?: string,
  // the integration identifier for the course, if defined. This field is only
  // included if the user has permission to view SIS information.
  "integration_id"?: null,
  // the unique identifier for the SIS import. This field is only included if the
  // user has permission to manage SIS information.
  "sis_import_id"?: number,
  // the full name of the course. If the requesting user has set a nickname for
  // the course, the nickname will be shown here.
  "name"?: string,
  // the course code
  "course_code"?: string,
  // the actual course name. This field is returned only if the requesting user
  // has set a nickname for the course.
  "original_name"?: string,
  // the current state of the course one of 'unpublished', 'available',
  // 'completed', or 'deleted'
  "workflow_state"?: string,
  // the account associated with the course
  "account_id"?: number,
  // the root account associated with the course
  "root_account_id"?: number,
  // the enrollment term associated with the course
  "enrollment_term_id"?: number,
  // A list of grading periods associated with the course 
  // CJ's note: they said it is an array but idk what type of array it is.
  "grading_periods"?: null,
  // the grading standard associated with the course
  "grading_standard_id"?: number | null,
  // the grade_passback_setting set on the course
  "grade_passback_setting"?: string | null,
  // the date the course was created.
  // in ISO datetiem format.
  "created_at"?: string,
  // the start date for the course, if applicable
  // in ISO datetiem format.
  "start_at"?: string | null,
  // the end date for the course, if applicable
  // in ISO datetiem format.
  "end_at"?: string | null,
  // the course-set locale, if applicable
  "locale"?: string | null,
  // A list of enrollments linking the current user to the course. for student
  // enrollments, grading information may be included if include[]=total_scores
  "enrollments"?: null | {
    // enrollment_type [String, "teacher"|"student"|"ta"|"observer"|"designer"]
    "type": string,
    // enrollment_role [String] Deprecated. 
    // 'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment', 'ObserverEnrollment',
    // or 'DesignerEnrollment'.
    "role": string,
    "role_id": number,
    "user_id": number,
    // enrollment_state [String, "active"|"invited_or_pending"|"completed"]
    "enrollment_state": string,
    "limit_privileges_to_course_section": boolean
  }[],
  // optional: the total number of active and invited students in the course
  "total_students"?: number,
  // course calendar
  "calendar"?: null | {
    // The URL of the calendar in ICS format
    "ics": string
  },
  // the type of page that users will see when they first visit the course -
  // 'feed': Recent Activity Dashboard - 'wiki': Wiki Front Page - 'modules':
  // Course Modules/Sections Page - 'assignments': Course Assignments List -
  // 'syllabus': Course Syllabus Page other types may be added in the future
  "default_view"?: string,
  // optional: user-generated HTML for the course syllabus
  "syllabus_body"?: string,
  // optional: the number of submissions needing grading returned only if the
  // current user has grading rights and include[]=needs_grading_count
  "needs_grading_count"?: number,
  // optional: the enrollment term object for the course returned only if
  // include[]=term
  "term"?: null,
  // optional: information on progress through the course returned only if
  // include[]=course_progress
  "course_progress"?: null | {
    // an integer specifying the total number of requirements in the course
    'requirement_count': number,
    // total number of requirements in this course that have been completed
    'requirement_completed_count': number,
    // will be null if all requirements have been
    // completed or the current module does not require sequential progress.
    'next_requirement_url': string | null,
    // the date the course was completed (null if incomplete).
    'completed_at': string | null,
  },
  // weight final grade based on assignment group percentages
  "apply_assignment_group_weights"?: boolean,
  // optional: the permissions the user has for the course. returned only for a
  // single course and include[]=permissions
  // example: { "create_discussion_topic": true, "create_announcement": true }
  // CJ's note: very confusing set of rules therefore set to any.
  "permissions"?: any,
  // Set to true if course is public to both authenticated and unauthenticated users.
  "is_public"?: boolean,
  // Set to true if course is public only to authenticated users.
  "is_public_to_auth_users"?: boolean,
  // Set to true to make the course syllabus public.
  "public_syllabus"?: boolean,
  // Set to true to make the course syllabus public for authenticated users.
  "public_syllabus_to_auth"?: boolean,
  // optional: the public description of the course. A publicly visible description of the course.
  "public_description"?: string,
  "storage_quota_mb"?: number,
  "storage_quota_used_mb"?: number,
  "hide_final_grades"?: boolean,
  //The name of the licensing. Should be one of the following abbreviations
  //  (a descriptive name is included in parenthesis for reference):
  //  - 'private' (Private Copyrighted)
  //  - 'cc_by_nc_nd' (CC Attribution Non-Commercial No Derivatives)
  //  - 'cc_by_nc_sa' (CC Attribution Non-Commercial Share Alike)
  //  - 'cc_by_nc' (CC Attribution Non-Commercial)
  //  - 'cc_by_nd' (CC Attribution No Derivatives)
  //  - 'cc_by_sa' (CC Attribution Share Alike)
  //  - 'cc_by' (CC Attribution)
  //  - 'public_domain' (Public Domain).
  "license"?: string,
  // If true, students will be able to modify the course wiki.
  "allow_student_assignment_edits"?: boolean,
  // If true, course members will be able to comment on wiki pages.
  "allow_wiki_comments"?: boolean,
  // If true, students can attach files to forum posts.
  "allow_student_forum_attachments"?: boolean,
  "open_enrollment"?: boolean,
  "self_enrollment"?: boolean,
  "restrict_enrollments_to_course_dates"?: boolean,
  // Optional. Specifies the format of the course. (Should be 'on_campus', 'online', or 'blended')
  "course_format"?: string,
  // optional: this will be true if this user is currently prevented from viewing
  // the course because of date restriction settings
  "access_restricted_by_date"?: boolean,
  // The course's IANA time zone name.
  "time_zone"?: string,
  // optional: whether the course is set as a Blueprint Course (blueprint fields
  // require the Blueprint Courses feature)
  "blueprint"?: boolean,
  // optional: Set of restrictions applied to all locked course objects
  "blueprint_restrictions"?: { "content": boolean, "points": boolean, "due_dates": boolean, "availability_dates": boolean },
  // optional: Sets of restrictions differentiated by object type applied to
  // locked course objects
  "blueprint_restrictions_by_object_type"?: { "assignment": { "content": boolean, "points": boolean }, "wiki_page": { "content": boolean } },
  // optional: whether the course is set as a template (requires the Course
  // Templates feature)
  "template"?: boolean
}
