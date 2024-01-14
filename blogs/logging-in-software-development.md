---
uniqueId: ID06-12-2024
type: blog
published-on: 6 December 2024
title: Effective Logging for Functions
description: This blog shares the best practices for writing logs for a functions.
keywords: logging,log,logs,java,javascript,best practices, how to write logs
draft: true
---


# Effective Logging for Functions: A Guide

Mastering function-level logging is a _crucial_ step towards understanding and implementing comprehensive logging for entire software systems. By focusing on the granular level of functions, we can build a solid foundation that makes scaling up to complex systems a breeze.

Here are five key points to remember when writing logs for a function:

1. **Specify the Log’s Origin:**
   - Logs should always include details about their origin, such as the *timestamp*, *file name*, and *function name*. This makes debugging easier, as you can query a specific filename and function name to debug that function alone. Each function should narrate its own story.

2. **Write with Debugging in Mind:**
   - Assume that you’ll need to debug every aspect of the function at some point. Write your logs as if an issue has occurred in your function and you now need to debug it.

3. **Narrate a Story:**
   - Logs should read like a story that covers everything important without straying from the main topic. Avoid including unnecessary information _(like printing data that isn’t needed)_.

4. **Test Your Logs Thoroughly:**
   - Just as we test our features after development, we should also test our logs. Check how the logs are printed for every failure and success case to ensure they convey the right message. Always review your logs from a debugger’s perspective.

5. **Avoid Over-Logging:**
   - Don’t print everything. Exclude sensitive information, especially when working with user data. For instance, instead of printing the complete user object, try printing only the *userId* or the information that you’re using in your code.


### Remember to log at the correct level:

- **INFO** - Informational messages.
- **WARN** - Indicates potential problems with no impact on user experience.
- **ERROR** - Indicates serious problems with some impact on user experience.
- **FATAL** - Indicates fatal errors with major impact on user experience.
- **DEBUG** - Used for debugging. The messaging targets the app’s developers specifically.

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