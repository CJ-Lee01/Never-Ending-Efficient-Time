export interface CanvasAPICourse {
  // Copied from https://canvas.instructure.com/doc/api/courses.html#Course
  // and edited with snippets from https://github.com/instructure/canvas-lms/blob/master/app/controllers/courses_controller.rb

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

export interface CanvasAPIAnnoucement {
  // copied from https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic.
  // with snippets from https://github.com/instructure/canvas-lms/blob/master/app/controllers/discussion_topics_controller.rb
  // I hate this.

  // The ID of this topic.
  "id": number,
  // The topic title.
  "title": string,
  // The HTML content of the message body. Note that it is HTML and requires the DOM parser.
  "message": string,
  // The URL to the discussion topic in canvas.
  "html_url": string,
  // The datetime the topic was posted. If it is null it hasn't been posted yet. ISO datetime string
  // (see delayed_post_at)
  "posted_at": string | null,
  // The datetime for when the last reply was in the topic.
  "last_reply_at": string,
  // If true then a user may not respond to other replies until that user has made
  // an initial reply. Defaults to false.
  "require_initial_post": boolean,
  // Whether or not posts in this topic are visible to the user.
  "user_can_see_posts": boolean,
  // The count of entries in the topic.
  "discussion_subentry_count": number,
  // The read_state of the topic for the current user, 'read' or 'unread'.
  "read_state": string,
  // The count of unread entries of this topic for the current user.
  "unread_count": number,
  // Whether or not the current user is subscribed to this topic.
  "subscribed": boolean,
  // (Optional) Why the user cannot subscribe to this topic. Only one reason will
  // be returned even if multiple apply. Can be one of: 'initial_post_required':
  // The user must post a reply first; 'not_in_group_set': The user is not in the
  // group set for this graded group discussion; 'not_in_group': The user is not
  // in this topic's group; 'topic_is_announcement': This topic is an announcement
  "subscription_hold"?: string,
  // The unique identifier of the assignment if the topic is for grading,
  // otherwise null.
  "assignment_id": number | null,
  // The datetime to publish the topic (if not right away).
  "delayed_post_at": string | null,
  // Whether this discussion topic is published (true) or draft state (false)
  "published": boolean,
  // The datetime to lock the topic (if ever).
  "lock_at": string | null,
  // Whether or not the discussion is 'closed for comments'.
  "locked": boolean,
  // Whether or not the discussion has been 'pinned' by an instructor
  "pinned": boolean,
  // Whether or not this is locked for the user.
  "locked_for_user": boolean,
  // (Optional) Information for the user about the lock. Present when
  // locked_for_user is true. can be { "can_view": boolean, "asset_string": string }
  "lock_info"?: any, //unable to find consistent documention for this type.
  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  "lock_explanation"?: string,
  // The username of the topic creator.
  "user_name": string,
  // DEPRECATED An array of topic_ids for the group discussions the user is a part
  // of.
  "topic_children": number[],
  // An array of group discussions the user is a part of. Fields include: id,
  // group_id
  "group_topic_children": { "id": number, "group_id": number }[],
  // If the topic is for grading and a group assignment this will point to the
  // original topic in the course.
  "root_topic_id": number | null,
  // If the topic is a podcast topic this is the feed url for the current user.
  "podcast_url": string,
  // The type of discussion. Values are 'side_comment', for discussions that only
  // allow one level of nested comments, and 'threaded' for fully threaded
  // discussions.
  "discussion_type": string,
  // The unique identifier of the group category if the topic is a group
  // discussion, otherwise null.
  "group_category_id": number | null,
  // Array of file attachments.
  "attachments": null | {
    "content-type": string,
    "url": string,
    "filename": string,
    "display_name": string
  }[],
  // The current user's permissions on this topic.
  "permissions": {
    "attach": boolean,
    "update": boolean,
    "reply": boolean,
    "delete": boolean
  },
  // Whether or not users can rate entries in this topic.
  "allow_rating": boolean,
  // Whether or not grade permissions are required to rate entries.
  "only_graders_can_rate": boolean,
  // Whether or not entries should be sorted by rating.
  "sort_by_rating": boolean,

  // additional parameters that I observed but was not in the documentation.
  "position": number,
  "author": {
    "id": number,
    "anonymous_id": string,
    "display_name": string,
    "avatar_image_url": string,
    "html_url": string,
    "pronouns": string | null
  },
  "todo_date": string | null,
  // There might be more but this is more than enough for me.
}

export interface CanvasAPIAssignment {
  // copied from https://canvas.instructure.com/doc/api/assignments.html#method.assignments_api.user_index
  // with snippets from https://github.com/instructure/canvas-lms/blob/master/app/controllers/assignments_api_controller.rb
  // this is so tough....
  
  // the ID of the assignment
  "id": number,
  // the name of the assignment
  "name": string,
  // the assignment description, in an HTML fragment
  "description": string,
  // The time at which this assignment was originally created
  "created_at": string,
  // The time at which this assignment was last modified in any way
  "updated_at": string,
  // the due date for the assignment. returns null if not present. NOTE: If this
  // assignment has assignment overrides, this field will be the due date as it
  // applies to the user requesting information from the API.
  "due_at": string,
  // the lock date (assignment is locked after this date). returns null if not
  // present. NOTE: If this assignment has assignment overrides, this field will
  // be the lock date as it applies to the user requesting information from the
  // API.
  "lock_at": string,
  // the unlock date (assignment is unlocked after this date) returns null if not
  // present NOTE: If this assignment has assignment overrides, this field will be
  // the unlock date as it applies to the user requesting information from the
  // API.
  "unlock_at": string,
  // whether this assignment has overrides
  "has_overrides": boolean,
  // (Optional) all dates associated with the assignment, if applicable
  "all_dates"?: null | {
    // (Optional, missing if 'base' is present) id of the assignment override this
    // date represents
    "id"?: number,
    // (Optional, present if 'id' is missing) whether this date represents the
    // assignment's or quiz's default due date
    "base"?: boolean,
    "title": string,
    // The due date for the assignment. Must be between the unlock date and the lock
    // date if there are lock dates
    "due_at": string,
    // The unlock date for the assignment. Must be before the due date if there is a
    // due date.
    "unlock_at": string,
    // The lock date for the assignment. Must be after the due date if there is a
    // due date.
    "lock_at": string
  }[],
  // the ID of the course the assignment belongs to
  "course_id": number,
  // the URL to the assignment's web page
  "html_url": string,
  // the URL to download all submissions as a zip
  "submissions_download_url": string,
  // the ID of the assignment's group
  "assignment_group_id": number
  // Boolean flag indicating whether the assignment requires a due date based on
  // the account level setting
  "due_date_required": boolean,
  // Allowed file extensions, which take effect if submission_types includes
  // 'online_upload'.
  "allowed_extensions": string[],
  // An integer indicating the maximum length an assignment's name may be
  "max_name_length": number,
  // Boolean flag indicating whether or not Turnitin has been enabled for the
  // assignment. NOTE: This flag will not appear unless your account has the
  // Turnitin plugin available
  "turnitin_enabled": boolean,
  // Boolean flag indicating whether or not VeriCite has been enabled for the
  // assignment. NOTE: This flag will not appear unless your account has the
  // VeriCite plugin available
  "vericite_enabled": boolean,
  // Settings to pass along to turnitin to control what kinds of matches should be
  // considered. originality_report_visibility can be 'immediate',
  // 'after_grading', 'after_due_date', or 'never' exclude_small_matches_type can
  // be null, 'percent', 'words' exclude_small_matches_value: - if type is null,
  // this will be null also - if type is 'percent', this will be a number between
  // 0 and 100 representing match size to exclude as a percentage of the document
  // size. - if type is 'words', this will be number > 0 representing how many
  // words a match must contain for it to be considered NOTE: This flag will not
  // appear unless your account has the Turnitin plugin available
  "turnitin_settings": number | null,
  // If this is a group assignment, boolean flag indicating whether or not
  // students will be graded individually.
  "grade_group_students_individually": boolean,
  // (Optional) assignment's settings for external tools if submission_types
  // include 'external_tool'. Only url and new_tab are included (new_tab defaults
  // to false).  Use the 'External Tools' API if you need more information about
  // an external tool.
  "external_tool_tag_attributes"?: any, // could not find documentation for the type.
  // Boolean indicating if peer reviews are required for this assignment
  "peer_reviews": boolean,
  // Boolean indicating peer reviews are assigned automatically. If false, the
  // teacher is expected to manually assign peer reviews.
  "automatic_peer_reviews": boolean,
  // Integer representing the amount of reviews each user is assigned. NOTE: This
  // key is NOT present unless you have automatic_peer_reviews set to true.
  "peer_review_count": number,
  // String representing a date the reviews are due by. Must be a date that occurs
  // after the default due date. If blank, or date is not after the assignment's
  // due date, the assignment's due date will be used. NOTE: This key is NOT
  // present unless you have automatic_peer_reviews set to true.
  "peer_reviews_assign_at"?: string,
  // Boolean representing whether or not members from within the same group on a
  // group assignment can be assigned to peer review their own group's work
  "intra_group_peer_reviews": boolean,
  // The ID of the assignment’s group set, if this is a group assignment. For
  // group discussions, set group_category_id on the discussion topic, not the
  // linked assignment.
  "group_category_id": number,
  // if the requesting user has grading rights, the number of submissions that
  // need grading.
  "needs_grading_count": number,
  // if the requesting user has grading rights and the
  // 'needs_grading_count_by_section' flag is specified, the number of submissions
  // that need grading split out by section. NOTE: This key is NOT present unless
  // you pass the 'needs_grading_count_by_section' argument as true.  ANOTHER
  // NOTE: it's possible to be enrolled in multiple sections, and if a student is
  // setup that way they will show an assignment that needs grading in multiple
  // sections (effectively the count will be duplicated between sections)
  "needs_grading_count_by_section": { "section_id": string, "needs_grading_count": number }[],
  // the sorting order of the assignment in the group
  "position": number,
  // (optional, present if Sync Grades to SIS feature is enabled)
  "post_to_sis"?: boolean,
  // (optional, Third Party unique identifier for Assignment)
  "integration_id"?: string,
  // (optional, Third Party integration data for assignment)
  "integration_data"?: any, // we dont rely use this, this is for admins.
  // the maximum points possible for the assignment
  "points_possible": number,
  // the types of submissions allowed for this assignment list containing one or
  // more of the following: 'discussion_topic', 'online_quiz', 'on_paper', 'none',
  // 'external_tool', 'online_text_entry', 'online_url', 'online_upload',
  // 'media_recording', 'student_annotation'
  "submission_types": string[],
  // If true, the assignment has been submitted to by at least one student
  "has_submitted_submissions": boolean,
  // The type of grading the assignment receives; one of 'pass_fail', 'percent',
  // 'letter_grade', 'gpa_scale', 'points'
  "grading_type": string,
  // The id of the grading standard being applied to this assignment. Valid if
  // grading_type is 'letter_grade' or 'gpa_scale'.
  "grading_standard_id": number | null,
  // Whether the assignment is published
  "published": boolean,
  // Whether the assignment's 'published' state can be changed to false. Will be
  // false if there are student submissions for the assignment.
  "unpublishable": boolean,
  // Whether the assignment is only visible to overrides.
  "only_visible_to_overrides": boolean,
  // Whether or not this is locked for the user.
  "locked_for_user": boolean,
  // (Optional) Information for the user about the lock. Present when
  // locked_for_user is true.
  "lock_info"?: null | {
    // Asset string for the object causing the lock
    "asset_string": string,
    // (Optional) Time at which this was/will be unlocked. Must be before the due
    // date.
    "unlock_at"?: string,
    // (Optional) Time at which this was/will be locked. Must be after the due date.
    "lock_at"?: string,
    // (Optional) Context module causing the lock.
    "context_module"?: string,
    "manually_locked": boolean
  },
  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  "lock_explanation"?: string,
  // (Optional) id of the associated quiz (applies only when submission_types is
  // ['online_quiz'])
  "quiz_id"?: number,
  // (Optional) whether anonymous submissions are accepted (applies only to quiz
  // assignments)
  "anonymous_submissions"?: boolean,
  // (Optional) the DiscussionTopic associated with the assignment, if applicable
  "discussion_topic"?: any, // could not find documentation for this.
  // (Optional) Boolean indicating if assignment will be frozen when it is copied.
  // NOTE: This field will only be present if the AssignmentFreezer plugin is
  // available for your account.
  "freeze_on_copy"?: boolean,
  // (Optional) Boolean indicating if assignment is frozen for the calling user.
  // NOTE: This field will only be present if the AssignmentFreezer plugin is
  // available for your account.
  "frozen"?: boolean,
  // (Optional) Array of frozen attributes for the assignment. Only account
  // administrators currently have permission to change an attribute in this list.
  // Will be empty if no attributes are frozen for this assignment. Possible
  // frozen attributes are: title, description, lock_at, points_possible,
  // grading_type, submission_types, assignment_group_id, allowed_extensions,
  // group_category_id, notify_of_update, peer_reviews NOTE: This field will only
  // be present if the AssignmentFreezer plugin is available for your account.
  "frozen_attributes"?: string[],
  // (Optional) If 'submission' is included in the 'include' parameter, includes a
  // Submission object that represents the current user's (user who is requesting
  // information from the api) current submission for the assignment. See the
  // Submissions API for an example response. If the user does not have a
  // submission, this key will be absent.
  // set as any as I wont be using it. Can read documentation here:
  // https://canvas.instructure.com/doc/api/submissions.html
  "submission"?: any,
  // (Optional) If true, the rubric is directly tied to grading the assignment.
  // Otherwise, it is only advisory. Included if there is an associated rubric.
  "use_rubric_for_grading"?: true,
  // (Optional) An object describing the basic attributes of the rubric, including
  // the point total. Included if there is an associated rubric.
  // actual generic object.
  "rubric_settings"?: object,
  // (Optional) A list of scoring criteria and ratings for each rubric criterion.
  // Included if there is an associated rubric.
  "rubric"?: null | {
    "points": number,
    // The id of rubric criteria.
    "id": string,
    // (Optional) The id of the learning outcome this criteria uses, if any.
    "learning_outcome_id"?: string,
    // (Optional) The 3rd party vendor's GUID for the outcome this criteria
    // references, if any.
    "vendor_guid"?: string,
    "description": string,
    "long_description": string,
    "criterion_use_range": boolean,
    "ratings": null | {
      "points": number,
      "id": string,
      "description": string,
      "long_description": string
    },
    "ignore_for_scoring": boolean
  }[],
  // (Optional) If 'assignment_visibility' is included in the 'include' parameter,
  // includes an array of student IDs who can see this assignment.
  "assignment_visibility"?: number[],
  // (Optional) If 'overrides' is included in the 'include' parameter, includes an
  // array of assignment override objects.
  "overrides"?: null | {

    // the ID of the assignment override
    "id": number,
    // the ID of the assignment the override applies to
    "assignment_id": number,
    // the IDs of the override's target students (present if the override targets an
    // ad-hoc set of students)
    "student_ids": number[],
    // the ID of the override's target group (present if the override targets a
    // group and the assignment is a group assignment)
    "group_id": number,
    // the ID of the overrides's target section (present if the override targets a
    // section)
    "course_section_id": number,
    // the title of the override
    "title": string,
    // the overridden due at (present if due_at is overridden)
    "due_at"?: string,
    // the overridden all day flag (present if due_at is overridden)
    "all_day"?: boolean,
    // the overridden all day date (present if due_at is overridden)
    "all_day_date"?: string,
    // the overridden unlock at (present if unlock_at is overridden)
    "unlock_at"?: string,
    // the overridden lock at, if any (present if lock_at is overridden)
    "lock_at"?: string
  }[],
  // (Optional) If true, the assignment will be omitted from the student's final
  // grade
  "omit_from_final_grade"?: boolean,
  // (Optional) If true, the assignment will not be shown in any gradebooks
  "hide_in_gradebook"?: boolean,
  // Boolean indicating if the assignment is moderated.
  "moderated_grading": boolean,
  // The maximum number of provisional graders who may issue grades for this
  // assignment. Only relevant for moderated assignments. Must be a positive
  // value, and must be set to 1 if the course has fewer than two active
  // instructors. Otherwise, the maximum value is the number of active instructors
  // in the course minus one, or 10 if the course has more than 11 active
  // instructors.
  "grader_count": number,
  // The user ID of the grader responsible for choosing final grades for this
  // assignment. Only relevant for moderated assignments.
  "final_grader_id": number,
  // Boolean indicating if provisional graders' comments are visible to other
  // provisional graders. Only relevant for moderated assignments.
  "grader_comments_visible_to_graders": boolean,
  // Boolean indicating if provisional graders' identities are hidden from other
  // provisional graders. Only relevant for moderated assignments with
  // grader_comments_visible_to_graders set to true.
  "graders_anonymous_to_graders": boolean,
  // Boolean indicating if provisional grader identities are visible to the final
  // grader. Only relevant for moderated assignments.
  "grader_names_visible_to_final_grader": boolean,
  // Boolean indicating if the assignment is graded anonymously. If true, graders
  // cannot see student identities.
  "anonymous_grading": boolean,
  // The number of submission attempts a student can make for this assignment. -1
  // is considered unlimited.
  "allowed_attempts": number,
  // Whether the assignment has manual posting enabled. Only relevant for courses
  // using New Gradebook.
  "post_manually": boolean,
  // (Optional) If 'score_statistics' and 'submission' are included in the
  // 'include' parameter and statistics are available, includes the min, max, and
  // mode for this assignment
  "score_statistics"?: null | {
    // Min score
    "min": number,
    // Max score
    "max": number,
    // Mean score
    "mean": number,
    // Upper quartile score
    "upper_q": number,
    // Median score
    "median": number,
    // Lower quartile score
    "lower_q": number
  },
  // (Optional) If retrieving a single assignment and 'can_submit' is included in
  // the 'include' parameter, flags whether user has the right to submit the
  // assignment (i.e. checks enrollment dates, submission types, locked status,
  // attempts remaining, etc...). Including 'can submit' automatically includes
  // 'submission' in the include parameter. Not available when observed_users are
  // included.
  "can_submit"?: boolean,
  // The id of the attachment to be annotated by students. Relevant only if
  // submission_types includes 'student_annotation'.
  "annotatable_attachment_id": number | null,
  // (Optional) Boolean indicating whether student names are anonymized
  "anonymize_students"?: boolean,
  // (Optional) Boolean indicating whether the Respondus LockDown Browser® is
  // required for this assignment.
  "require_lockdown_browser"?: boolean,
  // (Optional) Boolean indicating whether this assignment has important dates.
  "important_dates"?: boolean,
  // (Optional, Deprecated) Boolean indicating whether notifications are muted for
  // this assignment.
  "muted"?: boolean,
  // Boolean indicating whether peer reviews are anonymous.
  "anonymous_peer_reviews": boolean,
  // Boolean indicating whether instructor anotations are anonymous.
  "anonymous_instructor_annotations": boolean,
  // Boolean indicating whether this assignment has graded submissions.
  "graded_submissions_exist": boolean,
  // Boolean indicating whether this is a quiz lti assignment.
  "is_quiz_assignment": boolean,
  // Boolean indicating whether this assignment is in a closed grading period.
  "in_closed_grading_period": boolean,
  // Boolean indicating whether this assignment can be duplicated.
  "can_duplicate": boolean,
  // If this assignment is a duplicate, it is the original assignment's course_id
  "original_course_id": number,
  // If this assignment is a duplicate, it is the original assignment's id
  "original_assignment_id": number,
  // If this assignment is a duplicate, it is the original assignment's
  // lti_resource_link_id
  "original_lti_resource_link_id": number,
  // If this assignment is a duplicate, it is the original assignment's name
  "original_assignment_name": string,
  // If this assignment is a duplicate, it is the original assignment's quiz_id
  "original_quiz_id": number,
  // String indicating what state this assignment is in.
  "workflow_state": string
}