---
unique_id: ID06-12-2024
type: blog
published_on: 6 December 2024
title: Effective Logging for Function
description: Explore effective function-level logging with practical tips for clear and insightful logs.
keywords: logs,best_practices
draft: false
---


# Effective Logging for Function

Mastering function-level logging is a _crucial_ step towards understanding and implementing comprehensive logging for entire software systems. By focusing on the granular level of functions, we can build a solid foundation that makes scaling up to complex systems a breeze.

Here are five key points to remember when writing logs for a function:

1. **Specify the Log’s Origin:**
   - Always note down where the log is coming from. This includes the time it was created, the name of the file, and the function it’s related to. This helps when you’re trying to fix problems, as you can focus on a specific file or function.

2. **Write with Debugging in Mind:**
   - When you’re writing your logs, think about potential issues that might come up. Write your logs in a way that would help you solve these problems if they were to happen.

3. **Narrate a Story:**
   - Your logs should be like a story that sticks to the main point but covers all the important details. Each function should have its own story.

4. **Test Your Logs Thoroughly:**
   - Just like you test your work after you finish it, you should also test your logs. Make sure your logs are showing the right information for both successful and unsuccessful cases. Always look at your logs from the perspective of someone trying to fix a problem.

5. **Avoid Over-Logging:**
   - Don’t log everything. Leave out sensitive information, especially when dealing with user data. For example, instead of logging all the details about a user, just log the user’s ID or the information you’re using in your code.


### Remember to log at the correct level:

- **INFO** - Logs non-sensitive details about app's operation.
- **WARN** - Flags potential issues without affecting user experience.
- **ERROR** - Signals serious problems affecting user experience.
- **FATAL** - Marks major errors severely impacting user experience.
- **DEBUG** - Provides debugging information for developers.

<br/>

## Best Practices for Function Logging

**Essential elements in a log string:** Timestamp, ApplicationName, FileName, FunctionName, and LEVEL. 

**The message should convey:** the intended action, the initiator of the action, and the input and output.

Consider the following unstructured log entries:

```plaintext
2019-06-20T17:21:00.002899+00:00 myApp [c.d.g.UserRequestClass]: [getUser]: DEBUG: Fetching mailing list 14777
2019-06-20T17:21:00.002899+00:00 myApp [c.d.g.UserRequestClass]: [getUser]: DEBUG: User 3654 opted out
2019-06-20T17:21:00.002899+00:00 myApp [c.d.g.UserRequestClass]: [getUser]: DEBUG: User 1334563 plays 4 of spades in game 23425656
```

By structuring these entries as JSON, we enhance readability and ease of parsing:

```plaintext
2019-06-20T17:21:00.002899+00:00 myApp [c.d.g.UserRequestClass]: [getUser]: DEBUG: Fetching mailing list {"listid":14777}
2019-06-20T17:21:00.002899+00:00 myApp [c.d.g.UserRequestClass]: [getUser]: DEBUG: User opted out {"userid":3654}
2019-06-20T17:21:00.002899+00:00 myApp [c.d.g.UserRequestClass]: [getUser]: DEBUG: User plays {'user':1334563, 'card':'4 of spade', 'game':23425656}
```

By adhering to these practices, we can ensure our logs are informative, easy to read, and valuable for debugging.

<br/>

## Code Example and Best Practices

While working in a team, it’s important to keep your logs consistent across your program. A good way to do this is to create a logging template for your team. Ask every developer to use the same logging pattern. This way, even if many developers are writing code, the logs will look the same. You can make some example functions with good logging practices in the code. Other developers can look at these examples when they write their own code. Here’s an example:

```java
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class UserService {

    private static final Logger logger = LogManager.getLogger(UserService.class);
    private Database database;

    public UserService(Database database) {
        this.database = database;
    }

    public int getTotalLikesInLast30Days(String userId) {
        logger.info("Request received to get all total likes in last 30 days 
                for: {userId: " + userId + "}");
        long startTime = System.nanoTime();

        try {
            logger.debug("Fetching user with id: {userId: " + userId + "}");
            User user = database.getUserById(userId);

            if (user == null || user.isDeleted() || user.isDeactivated()) {
                logger.warn("User not found or deactivated: {userId: " + userId + "}");
                return 0;
            }

            LocalDate thirtyDaysAgo = LocalDate.now().minus(30, ChronoUnit.DAYS);
            logger.debug("Fetching posts for user since: {userId: " + userId + ", 
                    since: " + thirtyDaysAgo + "}");
            List<Post> posts = database.getPostsByUserSince(user, thirtyDaysAgo);

            int totalLikes = 0;
            for (Post post : posts) {
                totalLikes += post.getLikes().size();
            }

            long endTime = System.nanoTime();
            // compute the elapsed time in nanoseconds
            long duration = (endTime - startTime);  
            logger.info("Execution time: {timeInNanoseconds: " + duration + "}");
            logger.info("Returning total likes in last 30 days for: {userId: " + 
                    userId + ", totalLikes: " + totalLikes + "}");

            return totalLikes;
        } catch (Exception e) {
            logger.error("An error occurred: {message: " + e.getMessage() + "}", e);
            return 0;
        }
    }
}

```

Here's how the logs might look in a successful case:

```plaintext
2024-01-07 14:00:00,001 [INFO]  UserService.java:10 [com.example.UserService] (getTotalLikesInLast30Days) : Request received to get all total likes in last 30 days for: {userId: 123}
2024-01-07 14:00:00,002 [DEBUG] UserService.java:12 [com.example.UserService] (getTotalLikesInLast30Days) : Fetching user with id: {userId: 123}
2024-01-07 14:00:00,010 [DEBUG] UserService.java:18 [com.example.UserService] (getTotalLikesInLast30Days) : Fetching posts for user since: {userId: 123, since: 2023-12-08}
2024-01-07 14:00:00,020 [INFO]  UserService.java:26 [com.example.UserService] (getTotalLikesInLast30Days) : Execution time: {timeInNanoseconds: 19000000}
2024-01-07 14:00:00,021 [INFO]  UserService.java:28 [com.example.UserService] (getTotalLikesInLast30Days) : Returning total likes in last 30 days for: {userId: 123, totalLikes: 999}
```

And here's how they might look when an exception occurs, such as when the Post table does not exist:

```plaintext
2024-01-07 14:00:00,001 [INFO]  UserService.java:10 [com.example.UserService] (getTotalLikesInLast30Days) : Request received to get all total likes in last 30 days for: {userId: 123}
2024-01-07 14:00:00,002 [DEBUG] UserService.java:12 [com.example.UserService] (getTotalLikesInLast30Days) : Fetching user with id: {userId: 123}
2024-01-07 14:00:00,010 [DEBUG] UserService.java:18 [com.example.UserService] (getTotalLikesInLast30Days) : Fetching posts for user since: {userId: 123, since: 2023-12-08}
2024-01-07 14:00:00,015 [ERROR] UserService.java:18 [com.example.UserService] (getTotalLikesInLast30Days) : An error occurred: {message: "Post table does not exist"}
```

Packages like *log4j*, *slf4j*, and many others can be used for better management of logs in large software programs. 

Work on making good logs for each function. This will help you make better logs for the whole software.

<br/>

Thank you for reading this blog. _Sayonara!_