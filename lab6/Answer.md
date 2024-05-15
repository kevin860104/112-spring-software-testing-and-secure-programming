Name: 林民詳
ID: 512558003

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 7 min, 6 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 21 sec       │  total paths : 22     │
│ last uniq crash : 0 days, 0 hrs, 6 min, 49 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 3 min, 17 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 2 (9.09%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.89 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 4 (18.18%)             │
│ stage execs : 224/1620 (13.83%)     │  new edges on : 4 (18.18%)             │
│ total execs : 5923                  │ total crashes : 588 (1 unique)         │
│  exec speed : 16.00/sec (zzzz...)   │  total tmouts : 397 (8 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/384, 4/382, 2/378                   │    levels : 3          │
│  byte flips : 0/48, 0/46, 0/42                      │   pending : 21         │
│ arithmetics : 7/1341, 0/1029, 0/678                 │  pend fav : 4          │
│  known ints : 1/94, 2/365, 0/586                    │ own finds : 21         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/102, 0/0                            │ stability : 100.00%    │
│        trim : 100.00%/40, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000: 88%]

```

### Run Crash Result
```
ssize of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==191744==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe1262bfd8 (pc 0x55eb58d0eee1 bp 0x7ffe13e2cd30 sp 0x7ffe1262bfe0 T0)
    #0 0x55eb58d0eee1 in main /home/kali/AFL/lab6/src/hw0302.c:46
    #1 0x7f1ef91666c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f1ef9166784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55eb58d0f8d0 in _start (/home/kali/AFL/lab6/src/bmpcomp+0x28d0) (BuildId: 8fee90f88958c0594408a30de9c0d884264cdd47)

SUMMARY: AddressSanitizer: stack-overflow /home/kali/AFL/lab6/src/hw0302.c:46 in main
==191744==ABORTING


```
