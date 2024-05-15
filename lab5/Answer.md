# Answer

Name:林民詳
ID: 512558003

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    √    |   √   |
| Stack out-of-bounds  |    √    |   √   |
| Global out-of-bounds |    X    |   √   |
| Use-after-free       |    √    |   √   |
| Use-after-return     |    √    |   √   |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *array = malloc(6 * sizeof(int));
    if (array == NULL) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }
    for (int i = 0; i < 6; i++) {
        array[i] = i;
    }
    array[6] = 8;
    int value = array[6];
    printf("Value at index 6: %d\n", value);

    free(array);
    return 0;
}
```
#### Valgrind Report
```
==141876== Memcheck, a memory error detector
==141876== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==141876== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==141876== Command: ./heap
==141876== 
==141876== Invalid write of size 4
==141876==    at 0x1091E4: main (in /home/kali/Desktop/3HW/LAB5 /heap)
==141876==  Address 0x4a4d058 is 0 bytes after a block of size 24 alloc'd
==141876==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==141876==    by 0x10917A: main (in /home/kali/Desktop/3HW/LAB5 /heap)
==141876== 
==141876== Invalid read of size 4
==141876==    at 0x1091EE: main (in /home/kali/Desktop/3HW/LAB5 /heap)
==141876==  Address 0x4a4d058 is 0 bytes after a block of size 24 alloc'd
==141876==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==141876==    by 0x10917A: main (in /home/kali/Desktop/3HW/LAB5 /heap)
==141876== 
Value at index 6: 8
==141876== 
==141876== HEAP SUMMARY:
==141876==     in use at exit: 0 bytes in 0 blocks
==141876==   total heap usage: 2 allocs, 2 frees, 1,048 bytes allocated
==141876== 
==141876== All heap blocks were freed -- no leaks are possible
==141876== 
==141876== For lists of detected and suppressed errors, rerun with: -s
==141876== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==144730==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000058 at pc 0x564780db02af bp 0x7fffaba05790 sp 0x7fffaba05788                
WRITE of size 4 at 0x603000000058 thread T0                                  
    #0 0x564780db02ae in main /home/kali/Desktop/3HW/LAB5 /heap.c:13
    #1 0x7f2c130456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2c13045784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x564780db0100 in _start (/home/kali/Desktop/3HW/LAB5 /heap_asan+0x1100) (BuildId: 64a1565589341a383e6e23d90b82240b31899f0f)

0x603000000058 is located 0 bytes after 24-byte region [0x603000000040,0x603000000058)                                                                    
allocated by thread T0 here:                                                 
    #0 0x7f2c132d85bf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x564780db01d3 in main /home/kali/Desktop/3HW/LAB5 /heap.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/kali/Desktop/3HW/LAB5 /heap.c:13 in main
Shadow bytes around the buggy address:
  0x602ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x603000000000: fa fa 00 00 00 fa fa fa 00 00 00[fa]fa fa fa fa
  0x603000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==144730==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int array[6] = {1, 2, 3, 4, 5, 6};
    int out_of_bounds = array[6];
    printf("Out of bounds value: %d\n", out_of_bounds);
    array[6] = 8;

    return 0;
}

```
#### Valgrind Report
```
==148287== Memcheck, a memory error detector
==148287== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==148287== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==148287== Command: ./stack
==148287== 
==148287== Conditional jump or move depends on uninitialised value(s)
==148287==    at 0x48C4528: __printf_buffer (vfprintf-process-arg.c:58)
==148287==    by 0x48C4E00: __vfprintf_internal (vfprintf-internal.c:1459)
==148287==    by 0x48BAC4A: printf (printf.c:33)
==148287==    by 0x109189: main (in /home/kali/Desktop/3HW/LAB5 /stack)
==148287== 
==148287== Use of uninitialised value of size 8
==148287==    at 0x48B9EFB: _itoa_word (_itoa.c:177)
==148287==    by 0x48C3671: __printf_buffer (vfprintf-process-arg.c:155)
==148287==    by 0x48C4E00: __vfprintf_internal (vfprintf-internal.c:1459)
==148287==    by 0x48BAC4A: printf (printf.c:33)
==148287==    by 0x109189: main (in /home/kali/Desktop/3HW/LAB5 /stack)
==148287== 
==148287== Conditional jump or move depends on uninitialised value(s)
==148287==    at 0x48B9F0C: _itoa_word (_itoa.c:177)
==148287==    by 0x48C3671: __printf_buffer (vfprintf-process-arg.c:155)
==148287==    by 0x48C4E00: __vfprintf_internal (vfprintf-internal.c:1459)
==148287==    by 0x48BAC4A: printf (printf.c:33)
==148287==    by 0x109189: main (in /home/kali/Desktop/3HW/LAB5 /stack)
==148287== 
==148287== Conditional jump or move depends on uninitialised value(s)
==148287==    at 0x48C36C3: __printf_buffer (vfprintf-process-arg.c:186)
==148287==    by 0x48C4E00: __vfprintf_internal (vfprintf-internal.c:1459)
==148287==    by 0x48BAC4A: printf (printf.c:33)
==148287==    by 0x109189: main (in /home/kali/Desktop/3HW/LAB5 /stack)
==148287== 
Out of bounds value: 0
==148287== 
==148287== HEAP SUMMARY:
==148287==     in use at exit: 0 bytes in 0 blocks
==148287==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==148287== 
==148287== All heap blocks were freed -- no leaks are possible
==148287== 
==148287== Use --track-origins=yes to see where uninitialised values come from
==148287== For lists of detected and suppressed errors, rerun with: -s
==148287== ERROR SUMMARY: 4 errors from 4 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==149216==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7f6791900038 at pc 0x561c7cd513ca bp 0x7ffecd617b00 sp 0x7ffecd617af8               
READ of size 4 at 0x7f6791900038 thread T0                                   
    #0 0x561c7cd513c9 in main /home/kali/Desktop/3HW/LAB5 /stack.c:5
    #1 0x7f67938456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f6793845784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x561c7cd510e0 in _start (/home/kali/Desktop/3HW/LAB5 /stack_asan+0x10e0) (BuildId: f8b4b29451f47e8c820f6e73c4479a0f03c828d3)

Address 0x7f6791900038 is located in stack of thread T0 at offset 56 in frame
    #0 0x561c7cd511b8 in main /home/kali/Desktop/3HW/LAB5 /stack.c:3

  This frame has 1 object(s):
    [32, 56) 'array' (line 4) <== Memory access at offset 56 overflows this variable                                                                      
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/kali/Desktop/3HW/LAB5 /stack.c:5 in main
Shadow bytes around the buggy address:
  0x7f67918ffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f67918ffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f67918ffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f67918fff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f67918fff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f6791900000: f1 f1 f1 f1 00 00 00[f3]f3 f3 f3 f3 00 00 00 00
  0x7f6791900080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6791900100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6791900180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6791900200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6791900280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==149216==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global_array[6] = {0, 1, 2, 3, 4, 5};
void access_global_array() {
    int out_of_bounds = global_array[10];
    printf("Out of bounds value: %d\n", out_of_bounds);
    global_array[10] = 30;
}

int main() {
    access_global_array();
    return 0;
}

```
#### Valgrind Report
```
==151407== Memcheck, a memory error detector
==151407== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==151407== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==151407== Command: ./global
==151407== 
Out of bounds value: 0
==151407== 
==151407== HEAP SUMMARY:
==151407==     in use at exit: 0 bytes in 0 blocks
==151407==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==151407== 
==151407== All heap blocks were freed -- no leaks are possible
==151407== 
==151407== For lists of detected and suppressed errors, rerun with: -s
==151407== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==152164==ERROR: AddressSanitizer: global-buffer-overflow on address 0x556242aa0088 at pc 0x556242a9d202 bp 0x7ffe0bce2950 sp 0x7ffe0bce2948              
READ of size 4 at 0x556242aa0088 thread T0                                   
    #0 0x556242a9d201 in access_global_array /home/kali/Desktop/3HW/LAB5 /global.c:5
    #1 0x556242a9d214 in main /home/kali/Desktop/3HW/LAB5 /global.c:11
    #2 0x7f943ac456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f943ac45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x556242a9d0d0 in _start (/home/kali/Desktop/3HW/LAB5 /global_asan+0x10d0) (BuildId: 9033a778a0e254061b698c0be2c74f5198385f5b)

0x556242aa0088 is located 16 bytes after global variable 'global_array' defined in 'global.c:3:5' (0x556242aa0060) of size 24                             
SUMMARY: AddressSanitizer: global-buffer-overflow /home/kali/Desktop/3HW/LAB5 /global.c:5 in access_global_array
Shadow bytes around the buggy address:
  0x556242a9fe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242a9fe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242a9ff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242a9ff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242aa0000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f9
=>0x556242aa0080: f9[f9]f9 f9 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x556242aa0100: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x556242aa0180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242aa0200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242aa0280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x556242aa0300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==152164==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ptr = malloc(sizeof(int));
    *ptr = 20; 
    printf("Value: %d\n", *ptr);
    free(ptr);
    printf("After free value: %d\n", *ptr);
    *ptr = 30;
    return 0;
}
```
#### Valgrind Report
```
==153814== Memcheck, a memory error detector
==153814== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==153814== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==153814== Command: ./use
==153814== 
Value: 20
==153814== Invalid read of size 4
==153814==    at 0x1091A5: main (in /home/kali/Desktop/3HW/LAB5 /use)
==153814==  Address 0x4a4d040 is 0 bytes inside a block of size 4 free'd
==153814==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==153814==    by 0x1091A0: main (in /home/kali/Desktop/3HW/LAB5 /use)
==153814==  Block was alloc'd at
==153814==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==153814==    by 0x10916A: main (in /home/kali/Desktop/3HW/LAB5 /use)
==153814== 
After free value: 20
==153814== Invalid write of size 4
==153814==    at 0x1091C1: main (in /home/kali/Desktop/3HW/LAB5 /use)
==153814==  Address 0x4a4d040 is 0 bytes inside a block of size 4 free'd
==153814==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==153814==    by 0x1091A0: main (in /home/kali/Desktop/3HW/LAB5 /use)
==153814==  Block was alloc'd at
==153814==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==153814==    by 0x10916A: main (in /home/kali/Desktop/3HW/LAB5 /use)
==153814== 
==153814== 
==153814== HEAP SUMMARY:
==153814==     in use at exit: 0 bytes in 0 blocks
==153814==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==153814== 
==153814== All heap blocks were freed -- no leaks are possible
==153814== 
==153814== For lists of detected and suppressed errors, rerun with: -s
==153814== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==154483==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5576c3fdd279 bp 0x7ffde6889ae0 sp 0x7ffde6889ad8                 
READ of size 4 at 0x602000000010 thread T0                                   
    #0 0x5576c3fdd278 in main /home/kali/Desktop/3HW/LAB5 /use.c:9
    #1 0x7fd3196456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd319645784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5576c3fdd0f0 in _start (/home/kali/Desktop/3HW/LAB5 /use_asan+0x10f0) (BuildId: ee8a23b07728279eff5c02d8b880c4c79494416a)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)                                                                 
freed by thread T0 here:                                                     
    #0 0x7fd3198d7288 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x5576c3fdd20a in main /home/kali/Desktop/3HW/LAB5 /use.c:8

previously allocated by thread T0 here:
    #0 0x7fd3198d85bf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5576c3fdd1c3 in main /home/kali/Desktop/3HW/LAB5 /use.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/kali/Desktop/3HW/LAB5 /use.c:9 in main
Shadow bytes around the buggy address:
  0x601ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x602000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==154483==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int* Pointer() {
    int* local = (int*)malloc(sizeof(int));
    *local = 40;
    return local;  
}
void useAfter() {
    int* ptr = Pointer();
    free(ptr);
    printf("Value: %d\n", *ptr);
}
int main() {
    useAfter();
    return 0;
}
```
#### Valgrind Report
```
==175177== Memcheck, a memory error detector
==175177== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==175177== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==175177== Command: ./return
==175177== 
==175177== Invalid read of size 4
==175177==    at 0x1091A5: useAfter (in /home/kali/Desktop/3HW/LAB5 /return)
==175177==    by 0x1091CD: main (in /home/kali/Desktop/3HW/LAB5 /return)
==175177==  Address 0x4a4d040 is 0 bytes inside a block of size 4 free'd
==175177==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==175177==    by 0x1091A0: useAfter (in /home/kali/Desktop/3HW/LAB5 /return)
==175177==    by 0x1091CD: main (in /home/kali/Desktop/3HW/LAB5 /return)
==175177==  Block was alloc'd at
==175177==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==175177==    by 0x10916A: Pointer (in /home/kali/Desktop/3HW/LAB5 /return)
==175177==    by 0x109190: useAfter (in /home/kali/Desktop/3HW/LAB5 /return)
==175177==    by 0x1091CD: main (in /home/kali/Desktop/3HW/LAB5 /return)
==175177== 
Value: 40
==175177== 
==175177== HEAP SUMMARY:
==175177==     in use at exit: 0 bytes in 0 blocks
==175177==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==175177== 
==175177== All heap blocks were freed -- no leaks are possible
==175177== 
==175177== For lists of detected and suppressed errors, rerun with: -s
==175177== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==175842==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55d55d0ce24b bp 0x7ffd0e38ea00 sp 0x7ffd0e38e9f8                 
READ of size 4 at 0x602000000010 thread T0                                   
    #0 0x55d55d0ce24a in useAfter /home/kali/Desktop/3HW/LAB5 /return.c:12
    #1 0x55d55d0ce258 in main /home/kali/Desktop/3HW/LAB5 /return.c:15
    #2 0x7fc7b62456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7fc7b6245784 in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x55d55d0ce0f0 in _start (/home/kali/Desktop/3HW/LAB5 /return_asan+0x10f0) (BuildId: 4d440aabc3a2355e1167ae90969ed4eb44aa81c8)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)                                                                 
freed by thread T0 here:                                                     
    #0 0x7fc7b64d7288 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x55d55d0ce20e in useAfter /home/kali/Desktop/3HW/LAB5 /return.c:11

previously allocated by thread T0 here:
    #0 0x7fc7b64d85bf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x55d55d0ce1c6 in Pointer /home/kali/Desktop/3HW/LAB5 /return.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/kali/Desktop/3HW/LAB5 /return.c:12 in useAfter
Shadow bytes around the buggy address:
  0x601ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x602000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==175842==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[10];
    int b[10];
    int *ptr = (int *)((char *)a + sizeof(int) * 10);
    *ptr = 20;
    printf("b[0] = %d\n", b[0]);
    return 0;
}
```
### Why
ASan通常用於檢測動態分配的記憶體區域的越界訪問，它會在記憶體區域的末尾添加紅區redzone，這樣在發生越界訪問時，ASan就能夠檢測到並發出警告。
