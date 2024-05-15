#include <stdint.h>

void modifyMemory(uintptr_t address)
{
    if (address == 0) {
        return;
    }
    
    uintptr_t calculatedAddress = (address >> 3) | 0x7FFF8000;
    char* targetAddress = (char *)calculatedAddress;

    *targetAddress = 0x00;
}
