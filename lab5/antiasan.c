#include <stdint.h>

void antiasan(uintptr_t addr)
{
    if (addr == 0) {
        return;
    }
    char* add = (char *)((addr >> 3) | 0x7fff8000);
    *add = 0x00;
}
