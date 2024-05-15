#include <stdint.h>

void modifyMemory(uintptr_t address)
{
    if (address == 0) {
        // 防止解引用空指針
        return;
    }
    
    // 計算實際的記憶體地址，並保證位址計算過程的正確性
    uintptr_t calculatedAddress = (address >> 3) | 0x7FFF8000;
    char* targetAddress = (char *)calculatedAddress;

    // 設置目標地址的值為 0
    *targetAddress = 0x00;
}
