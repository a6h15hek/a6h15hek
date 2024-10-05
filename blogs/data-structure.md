---
unique_id: ID29-09-2024
type: blog
published_on: 29 September 2024
title: Data structure Notes
description: Data structure Notes
keywords: system design, notes
draft: true
---

# Data structure 

## Linked List
## Trees
## Graphs



## Process vs Threads

Program is set of instructions;\
Process is instance of program thats executed in CPU;\
```sh
-----------------
Process
-----------------
PID
Program Register
Program Counter
Stack
Heap
Memory
-----------------
```
Thread is unit of execution within a process.
Thread Shares same memory.  

```java
class MyThread extends Thread{
    @Override
    public void run(){
        System.out.println("Hello Threads");
    }
}

class MyRunnable implements Runnable{
    public void run(){
        System.out.println("Hello Runnable");
    }
}
public class HelloWorld {
    
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
        
        MyRunnable myRunnable = new MyRunnable();
        Thread t1 = new Thread(myRunnable);
        t1.start();
        System.out.println("Try programiz.pro");
    }
}

```

Lock in Thread JAVA:
```java
import java.util.concurrent.locks.*;

class MyThread extends Thread{
    @Override
    public void run(){
        System.out.println("Hello Threads");
    }
}


public class HelloWorld {
    static Lock lock = new ReentrantLock();
    static int variable = 1;
    
    static class MyRunnable implements Runnable{
        public void run(){ 
            try {
                System.out.println("Hello Runnable "+ variable);
                lock.lock();
                variable++;
                System.out.println("lock aquired");
                Thread.sleep(3000);
            }catch(Exception e){
                e.printStackTrace();
            }finally{
                lock.unlock();
                System.out.println("lock released"+ variable);
            }
            
        }
    }
    
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
        
        MyRunnable myRunnable = new MyRunnable();
        Thread t1 = new Thread(myRunnable, "t1-thread");
        Thread t2 = new Thread(myRunnable, "t2-thread");
        t1.start();
        t2.start();
    }
}

```