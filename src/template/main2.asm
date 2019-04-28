;♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥;      
;♥ .      _ _  __   .                                               ♥;
;♥     * ( | )/_/       ; NES TEMPLATE                              ♥;
;♥  . __( >O< )    *    ; Placeholder                               ♥;
;♥    \_\(_|_)  +       ; Placeholder                               ♥;
;♥  +       .         .                                             ♥;
;♥                                                                  ♥;
;♥                                                                  ♥;
;♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥;


;; 1.0 NESASM3.0 HEADER
;; 2.0 VARIABLES
;; 3.0 CONSTANTS
;; 4.0 GAME CODE BANK 0
;;;; 4.1 Console initialization
;;;; 4.2 Game initialization
;;;; 4.3 Game loop
;; 5.0 GAME CODE BANK 1 (Music)
;; 6.0 GAME CODE BANK 2 (NMI)
;;;; 6.1 NMI
;;;; 6.2 Subroutines
;;;; 6.3 Binary data
;; 7.0 GAME CODE BANK 3 (Vectors)
;; 8.0 GAME CODE BANK 4 (Graphics)
                                                        
;;;;;;;; + 1.0 NESASM3.0 HEADER + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;      
                                                                    ;;
    .inesprg 2          ; 2 16-KB banks PRG data (32KB total)       ;;
    .ineschr 1          ; 1 8-KB bank CHR data (8KB total)          ;;
    .inesmap 0          ; No mapper                                 ;;
    .inesmir 0          ; Vertical mirroring                        ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;; + 2.0 VARIABLES + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
    .rsset $0000        ; Start variables at $0000 (zero page)      ;;
music           .rs 16  ; Leave the first 16 bytes free for music   ;;          
buttons1        .rs 1   ; Buttons pressed (P1)                      ;;      
buttons1pending .rs 1   ; Buttons pressed but not read (P1)         ;;          
buttons1read    .rs 1   ; Buttons pressed that need to be read (P1) ;;
buttons2        .rs 1   ; Buttons pressed (P2)                      ;;      
buttons2pending .rs 1   ; Buttons pressed but not read (P2)         ;;          
buttons2read    .rs 1   ; Buttons pressed that need to be read (P2) ;;         
framecounter    .rs 1   ; General-purpose frame counter             ;;      
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;; + 3.0 CONSTANTS + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
PPUSCROLL = $2005       
PPUCTRL = $2000
PPUMASK = $2001
PPUSTATUS = $2002
PPUADDR = $2006
PPUDATA - $2007
INITADDR = $A999        ; Init address for music                    ;;
LOADADDR = $A6E0        ; Load address for music                    ;;
PLAYADDR = $A99C        ; Play address for music                    ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;; + 4.0 GAME CODE: BANK 0 + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
    .bank 0             ; Bank 0                                    ;;
    .org $8000          ; begins at address $8000                   ;;
                                                                    ;;
;;;;;;;;;; 4.1 Console initialization ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
Reset:                  ; This code runs when console is reset      ;;
    SEI                                                             ;;
    CLD                                                             ;;
    LDX #$40                                                        ;;
    STX $4017                                                       ;;
    LDX #$FF                                                        ;;
    TXS                                                             ;;
    INX                                                             ;;
    STX $2000                                                       ;;
    STX $2001                                                       ;;
    STX $4010                                                       ;;
Vblank1:                ; Wait for first V-blank                    ;;
    BIT $2002                                                       ;;
    BPL Vblank1                                                     ;;
ClearMem:               ; Clear memory                              ;;          
    LDA #$00                                                        ;;
    STA $0000, x                                                    ;;
    STA $0100, x                                                    ;;
    STA $0300, x                                                    ;;
    STA $0400, x                                                    ;;
    STA $0500, x                                                    ;;
    STA $0600, x                                                    ;;
    STA $0700, x                                                    ;;
    LDA #$FE                                                        ;;
    STA $0200, x                                                    ;;
    INX                                                             ;;
    BNE ClearMem                                                    ;;
Vblank2:                ; Wait for second V-blank                   ;;
    BIT $2002                                                       ;;
    BPL Vblank2                                                     ;; 
                                                                    ;;
;;;;;;;;; 4.2 Game initialization ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;  
    LDA #$00            ; Initialize sound registers                ;;
    LDX #$00                                                        ;;
ClearSoundLoop:                                                     ;;
    STA $4000, x                                                    ;;
    INX                                                             ;;
    CPX #$0F                                                        ;;  
    BNE ClearSoundLoop                                              ;;
    LDA #$10                                                        ;;
    STA $4010                                                       ;;
    LDA #$00                                                        ;;
    STA $4011                                                       ;;
    STA $4012                                                       ;;
    STA $4013                                                       ;;
    LDA #%00001111                                                  ;;
    STA $4015                                                       ;;  
    LDA #$00                                                        ;;
    LDX #$00                                                        ;;
    JSR INITADDR                                                    ;;
    LDA #$00            ; Reset framecounter                        ;;
    STA framecounter                                                ;;
    JSR TurnScreenOff   ; Disable screen rendering                  ;;
    JSR LoadBG          ; Load background                           ;;
    JSR LoadSpr         ; Load sprites                              ;;
    JSR TurnScreenOn    ; Enable screen rendering                   ;;
                                                                    ;;
;;;;;;;;;;;; 4.3 Game loop ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
GameLoop:                                                           ;;
    JMP GameLoop        ; Infinite main game loop                   ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;; + 5.0 GAME CODE: BANK 1 + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
    .bank 1             ; Bank 1                                    ;;
    .org LOADADDR       ; Starts at music LOADADDR                  ;;
    .incbin "music.nsf" ; Include binary NSF music file             ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;; + 6.0 GAME CODE: BANK 2 + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
    .bank 2             ; Bank 2                                    ;;
    .org $C000          ; Starts at memory address $C000            ;;
                                                                    ;;
;;;;;;;;;;;; 6.1 NMI ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
NMI:                    ; Non-maskable interrupt                    ;;
    PHA                 ; Back up registers                         ;;
    TXA                                                             ;;
    PHA                                                             ;;
    TYA                                                             ;;
    PHA                                                             ;;
    LDX framecounter    ; Add one to the frame counter              ;;
    INX                                                             ;;
    STX framecounter                                                ;;
    JSR SpriteDMA       ; Bring in sprite data                      ;;
    LDA #$00            ; Disable scrolling                         ;;
    STA $2005                                                       ;;
    STA $2005                                                       ;;
    JSR PLAYADDR        ; Update audio                              ;;
NMIDone:                ; Final actions in NMI                      ;;
    PLA                 ; Restore registers                         ;;
    TAY                                                             ;;
    PLA                                                             ;;
    TAX                                                             ;;
    PLA                                                             ;;
    RTI                 ; NMI is done                               ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
;;;;;;;;;;;; 6.2 Subroutines ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
SpriteDMA:              ; Sprite DMA subroutine                     ;;
    LDA #$00                                                        ;;
    STA $2003                                                       ;;
    LDA #$03                                                        ;;
    STA $4014                                                       ;;
    RTS                                                             ;;
LoadBG:                 ; "Load background" subroutine              ;;
    LDA $2002                                                       ;;
    LDA #$3F                                                        ;;
    STA $2006                                                       ;;
    LDA #$00                                                        ;;
    STA $2006                                                       ;;
    LDX #$00                                                        ;;
LoadPalLoop:            ; Default palette is loaded on reset        ;;
    LDA defaultpal, x                                               ;;
    STA $2007                                                       ;;
    INX                                                             ;;
    CPX #$20                                                        ;;
    BNE LoadPalLoop                                                 ;;
    LDA $2002                                                       ;;
    LDA #$20                                                        ;;
    STA $2006                                                       ;;
    LDA #$00                                                        ;;
    STA $2006                                                       ;;
    LDX #$00                                                        ;;
LoadTitleNewNam1:       ; Load first set of 256 background tiles    ;;
    LDA background1,x                                               ;;
    STA $2007                                                       ;;
    INX                                                             ;;
    BNE LoadTitleNewNam1                                            ;;
LoadTitleNewNam2:       ; Load second set of 256 background tiles   ;;
    LDA background2,x                                               ;;
    STA $2007                                                       ;;
    INX                                                             ;;
    BNE LoadTitleNewNam2                                            ;;
LoadTitleNewNam3:       ; Load third set of 256 background tiles    ;;
    LDA background3,x                                               ;;
    STA $2007                                                       ;;
    INX                                                             ;;
    BNE LoadTitleNewNam3                                            ;;
LoadTitleNewNam4:       ; Load fourth set of background tiles       ;;
    LDA background4,x                                               ;;
    STA $2007                                                       ;;
    INX                                                             ;;
    CPX #$E0            ; (Don't have to load all 256)              ;;
    BNE LoadTitleNewNam4                                            ;;
LoadAttr:               ; Load initial attribute values for BG      ;;
    LDA #$23                                                        ;;
    STA $2006                                                       ;;
    LDA #$c0                                                        ;;
    STA $2006                                                       ;;
    LDX #$00                                                        ;;
LoadAttrLoop:                                                       ;;
    LDA attr, x                                                     ;;
    STA $2007                                                       ;;
    INX                                                             ;;
    CPX #$40                                                        ;;
    BNE LoadAttrLoop                                                ;;
    RTS                                                             ;;
LoadSpr:                ; Load initial sprite values                ;;
    LDX #$00                                                        ;;
LoadSprLoop:                                                        ;;
    LDA heart,x                                                     ;;
    STA $0300,x                                                     ;;
    INX                                                             ;;
    CPX #$20                                                        ;;
    BNE LoadSprLoop                                                 ;;
    RTS                                                             ;;
TurnScreenOn:           ; Enable screen rendering                   ;;
    LDA #%10010000                                                  ;;
    STA $2000                                                       ;;
    LDA #%00011010                                                  ;;
    STA $2001                                                       ;;
    RTS                                                             ;;
TurnScreenOff:          ; Disable screen rendering                  ;;
    LDA #$00                                                        ;;
    STA $2000                                                       ;;
    STA $2001                                                       ;;
    RTS                                                             ;;
ReadController1:        ; Read the P1 controller                    ;;
    LDA #$01                                                        ;;          
    STA $4016                                                       ;;
    LDA #$00                                                        ;;
    STA $4016                                                       ;;
    LDX #$08                                                        ;;
ReadController1Loop:                                                ;;
    LDA $4016                                                       ;;
    LSR A                                                           ;;
    ROL buttons1                                                    ;;
    DEX                                                             ;;
    BNE ReadController1Loop                                         ;;
    LDA buttons1pending ; Note: This code is helpful in helping to  ;;
    EOR #%11111111      ; distinguish between reading a continuous  ;;
    AND buttons1        ; button press and a single button press    ;;
    STA buttons1read    ; Often, we want to read the first button   ;;
    LDA buttons1        ; value sent and then ignore subsequent     ;;
    STA buttons1pending ; reads until the button is released        ;;
    RTS                                                             ;;
ReadController2:        ; Read the P1 controller                    ;;
    LDA #$01                                                        ;;          
    STA $4017                                                       ;;
    LDA #$00                                                        ;;
    STA $4017                                                       ;;
    LDX #$08                                                        ;;
ReadController2Loop:                                                ;;
    LDA $4017                                                       ;;
    LSR A                                                           ;;
    ROL buttons2                                                    ;;
    DEX                                                             ;;
    BNE ReadController2Loop                                         ;;
    LDA buttons2pending ; Note: This code is helpful in helping to  ;;
    EOR #%11111111      ; distinguish between reading a continuous  ;;
    AND buttons2        ; button press and a single button press    ;;
    STA buttons2read    ; Often, we want to read the first button   ;;
    LDA buttons2        ; value sent and then ignore subsequent     ;;
    STA buttons2pending ; reads until the button is released        ;;
    RTS                                                             ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
;;;;;;;;;;;; 6.3 Binary data ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
background1:            ; First 256-tile set of background          ;;
    .incbin "background1.nam"                                       ;;
background2:            ; Second 256-tile set of background         ;;
    .incbin "background2.nam"                                       ;;
background3:            ; Third 256-tile set of background          ;;
    .incbin "background3.nam"                                       ;;
background4:            ; Fourth 256-tile set of background         ;;
    .incbin "background4.nam"                                       ;;
defaultpal:             ; Default color palette                     ;;
    .db $38,$30,$26,$25 ; Background colors                         ;;
    .db $38,$30,$2B,$21                                             ;;
    .db $38,$30,$23,$21                                             ;;
    .db $38,$30,$30,$30                                             ;;
    .db $38,$23,$22,$21 ; Sprite colors                             ;;
    .db $38,$2C,$2B,$2A                                             ;;
    .db $38,$29,$28,$27                                             ;;
    .db $38,$26,$25,$24                                             ;;
attr:                   ; Color attribute table                     ;;
    .db $00,$00,$00,$00,$00,$00,$00,$00                             ;;
    .db $00,$00,$00,$00,$00,$00,$00,$00                             ;;
    .db $50,$50,$50,$50,$50,$50,$50,$50                             ;;
    .db $56,$56,$56,$56,$56,$56,$56,$56                             ;;
    .db $55,$55,$55,$55,$55,$55,$55,$55                             ;;
    .db $A5,$A5,$A5,$A5,$A5,$A5,$A5,$A5                             ;;
    .db $AA,$AA,$AA,$AA,$AA,$AA,$AA,$AA                             ;;
    .db $0A,$0A,$0A,$0A,$0A,$0A,$AA,$AA                             ;;
heart:                  ; Heart and sparkle sprite tile data        ;;
    .db $58,$00,$00,$78 ; Heart tiles                               ;;
    .db $58,$01,$00,$80                                             ;;
    .db $60,$10,$00,$78                                             ;;
    .db $60,$11,$00,$80                                             ;;
    .db $5C,$04,$00,$7C ; Sparkle tiles                             ;;  
    .db $5C,$05,$00,$7C                                             ;;
    .db $5C,$14,$00,$7C                                             ;;
    .db $5C,$15,$00,$7C                                             ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    

;;;;;;;; + 7.0 GAME CODE: BANK 3 + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
    .bank 3             ; Bank 3                                    ;;
    .org $E000          ; Begins at memory address $E000            ;;
    .org $FFFA          ; Final three bytes (vectors):              ;;
    .dw NMI             ; When an NMI happens, jump to NMI          ;;
    .dw Reset           ; On reset/power on, jump to Reset          ;;
    .dw 0               ; IRQ disabled                              ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    
  
;;;;;;;; + 8.0 GRAPHICS DATA: BANK 4 + ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                                                                    ;;
    .bank 4             ; Bank 4                                    ;;
    .org $0000          ; Starts at $0000 (CHR)                     ;;
    .incbin "gfx.chr"   ; Include graphics binary                   ;;
                                                                    ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;