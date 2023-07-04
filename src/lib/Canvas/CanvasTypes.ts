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
  "subscription_hold": string,
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
  // locked_for_user is true.
  "lock_info": {
    "can_view": boolean,
    "asset_string": string
  },
  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  "lock_explanation": string,
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