---
title: Hello, world program in Assembly
description: In this post i will show how to write and assemble a 'Hello, world' program in Assembly for a Linux 64-Bits target.
pubDate: Jun 17 2024
---

Hey! Welcome to my first blog!  
In this occasion I will show you how to write and assemble a program that prints 'Hello, world' to the terminal.  
Sounds easy? Well not so fast, because we are going to write it in Assembly.

Assembly is a very low level programming language that communicates directly with the processor via simplified instructions that are easier to read for us, instead of writing directly in binary code, we can write in Assembly.

### But why Assembly?

Through the time Assembly had many changes and variations, that is because different processors made different use of the Assembly language, for example, some old retro 8-Bit consoles used to had their games made in Assembly.  
But today, Assembly lost most of its uses because we have high level programming languages that can do almost everything without writing directly in almost-machine code.

Assembly is still very important because, even when it's not used to make games or write applications, Assembly is still the best way to communicate with the processor when nothing else can do it, like in a bare metal environment.  
A bare metal environment means that there is no underlying operating system, it's just the processor, the memory, the BIOS, and nothing else.

So when it's about building operating systems and kernels, Assembly is still pretty relevant even today!

### Preparation

First, we need an assembler.

An assembler is the program that will take our Assembly code and convert it to machine code, there are many assemblers you can download, but my personal favorite to use is NASM, that you can download [here](https://nasm.us/).  
Now that you got an assembler, now you are going to need a linker, if you are on Linux you should have the GNU linker in the form of the 'ld' command, and since this blog is about building the program for Linux, we should be just fine.

### The code

Now, let's try to understand how assembly works.  
As we said earlier, Assembly works by passing instructions to the processor, these instructions do very simple things by interacting with memory and **registers**

Registers are basically memory spots that are inside our processor, so it has quicker and easier access to them, there are 16 different registers in a 64-Bits processor, and 8 in a 32-Bits processor.

In Assembly language we use registers to store values, like numbers or characters, and make operations between them.  
We also can use normal variables, that are just pointers to the memory address of the values we store in them, but before any of that, we need to get familiar with how to write Assembly code, and it's structure

```asm
section .data

    # This section will be used to declare our constant and initialized data.

section .bss

    # This section will be used for declaring non-static data.

section .text

    # And this section will be used to write our actual code in the form of instructions.

```

In Assembly, we need to divide our code into 3 different **sections**, the *.data* section is where we can define constant and initialized data, that means anything we put in here will not change afterwards.  
In the other hand we have the *.bss* section, this one is where we can initialize variables that may change in the future of our code.  
Lastly we have our *.text* section, this is where all the rest of our code is written, functions and instructions will go in here.

So now we know how our code is going to be divided, you may be asking how we can declare our first variable, so here we go:

```asm

name db "hey!"

```

So in this example we are declaring a variable called **name**, with a type of **db** and a value of **hey!**  
But what is db? db stands for define byte, it reserves a space of one byte into our memory for each character in the string plus one more for the null terminator.  
The null terminator is just a special character that will tell our processor where the string has ended, so it doesn't fall into any confusion or executes unexpected behavior.

Anyways! Let's start writing our first Assembly program by defining our sections to use and our first variable! It would go something like this:

```asm

section .text

    # We reserve this space for our code

section .data
msg db "Hello, world!" # And this is our variable containing the string we want to print!

```

Now we got that done, we can start to write our code.  
It's important to know that we are building this program for a Linux 64-Bits target, and since, there is an underlying OS, we cannot mess with memory and low-level stuff so easily.  
Luckily, the OS gives us a very important set of tools called **system calls**, these let us send a message to the OS letting them know we want to execute some actions, and provide it with necessary data via the processor's registers.  
These system calls change depending on the OS we are in and the architecture of our processor, so for the sake of brevity we are going to center ourselves in Linux 64-Bits for now, but in the future I may continue to give an example of other operating systems!

So, first of all, to write our code we need to define a new function, this will be the starting point of our program, so we can declare it something like this:

```asm

section .text
    global _start
    _start: # Our function name

section .data
msg db "Hello, world!"

```

As you can see I named our function `_start` and also added a `global _start` on the top, this is needed because it will let our linker know that our function `_start` is indeed the starting point of our program!  
Also, the underscore is needed too by the linker in some cases, so it's kind of important that is there at the front of our function's name.

Let's continue to add some instructions to our code, as we said before, Assembly uses simple instructions to manipulate memory, one of these instructions is the `mov` instruction, it tells our processor to copy a value from a place to another, so we are going to use it to feed our system call with some parameters that are needed:

```asm

section .text
    global _start
    _start:
        mov rax, 1
        mov rdi, 1
        mov rsi, msg

section .data
msg db "Hello, world!"

```

This is quite a big chunk of new code, so I'm going to break it down for you

`mov rax, 1` Is the first instruction of our function, in here we are telling the computer to copy the value 1 to our *rax* register, the *rax* register in Linux 64-bits is used to store the number of the system call we are about to make, in this case 1 is the number of the write system call, that will essentially write to the terminal.
`mov rdi, 1` Here we are passing a value of 1 to the *rdi* register, the system call write asks us for a number that will be the file descriptor, in this case 1 is the value for the standard output file descriptor.
`mov rsi, msg` In here we are just passing the value of our message variable to the *rsi* register, that is where the system call expects the string to print in our terminal.

We are finished? No, the system call asks for a last value to be passed into the *rdx* register, which should be an integer that represents the length of our string.  
We could technically pass the number 13, since our string has 13 characters (Counting whitespaces), but if we were to change our string then the length would be wrong and would need to be corrected too.  
Instead of that, we are going to declare a new constant that will calculate the length of our string for us, and then we will pass that constant to the *rdx* register like this:

```asm

section .text
    global _start
    _start:
        mov rax, 1
        mov rdi, 1
        mov rsi, msg
        mov rdx, len
        
        syscall

section .data
msg db "Hello, world!"
len equ $-msg

```

Here we declared our new constant `len`, it will calculate the length of our message by substracting it to our current pointer position.
Finally, we are calling to the system call with the instruction `syscall`

If we were to assemble, link, and execute this file it would print the message, but we are not finished yet!  
It would also throw us an error and end execution, but why?

The error would say `Segmentation fault (core dumped)`, this is just our processor telling that it tried to read, modify or manipulate memory that is non-existant, or it doesn't have permission to access.  
The problem here is that we told our processor to do everything but finish the program, in Assembly, the processor will try to execute all the instructions on the memory until it's told to stop, and we missed that last part, because of that, it is trying to read memory that is not part of our program, and the kernel is just stopping it from that and throwing the error.

To make the processor stop the execution of the program we can do a second system call, this time to exit the program with an error code of 0, which means successful.

```asm

section .text
    global _start
    _start:
        mov rax, 1
        mov rdi, 1
        mov rsi, msg
        mov rdx, len
        
        syscall

        mov rax, 60
        mov rdi, 0

        syscall

section .data
msg db "Hello, world!"
len equ $-msg

```

In this code example we added our secondary system call, in which we are asked for only two arguments, the number of the system call (In this case is 60, for our Linux 64-Bits target), again passed to the *rax* register, and the exit code, passed to the *rdi* register.  
Executing this code would run successfully and execute both system calls, letting us with this output.

```
Hello, world!
```

But wait, I told you how to write the code but not how to execute it, but don't worry, it won't be so hard.  

As we said before, the code needs to be passed to an assembler and then to a linker, we can do this by executing the following commands in our terminal

`nasm -felf64 -o main.o code.asm`

Just replace `code.asm` with the name of your file you have written to.  
We can see I also passed it the format, in case it's an object for an elf 64 bits target, that means it will work on linux 64-Bits, and I also gave it an output, that just tells the assembler to give us an object file named main, we will link this object file to make an executable like this:

`ld -o main main.o`

This command passes the object file to the linker, and tells it to return an executable named `main`, now, if we executed this program just using `./main` in our terminal, you would see the output!

Congrats! You just made your first program in Assembly language! Now, it's not really about what the program does, but the important stuff is everything you learned about how your computer and processor works! I hope I've been clear, and that this tiny tutorial helped you understand how complex computers can be!

#### Thanks for reading!