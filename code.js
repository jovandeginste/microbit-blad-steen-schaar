function naarTeken (num: number) {
    if (num == 1) {
        basic.showIcon(IconNames.Square)
    } else if (num == 2) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (num == 3) {
        basic.showIcon(IconNames.Scissors)
    } else {
        basic.showIcon(IconNames.No)
    }
}
input.onButtonPressed(Button.A, function () {
    start()
})
input.onGesture(Gesture.Shake, function () {
    if (kiezen > 1) {
        kiezen += -1
    } else if (kiezen == 1) {
        kies()
        kiezen = 0
        music.playMelody("B B - F F - B B ", 500)
    } else {
    	
    }
})
function gewonnen (mijnHand: number, andereHand: number) {
    if (mijnHand == 1 && andereHand == 2) {
        return 1
    } else if (mijnHand == 2 && andereHand == 3) {
        return 1
    } else if (mijnHand == 3 && andereHand == 1) {
        return 1
    } else if (mijnHand == andereHand) {
        return 0
    } else {
        return -1
    }
}
input.onButtonPressed(Button.B, function () {
    if (kiezen == 0) {
        radio.sendValue("hand", hand)
        toon = 1
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "hand") {
        andereHand = value
    }
})
function start () {
    toon = 0
    andereHand = 0
    hand = 0
    kiezen = 5
    basic.showString("Shake!")
    music.playMelody("E E - G G - E E ", 500)
}
function kies () {
    hand = randint(1, 3)
}
let andereHand = 0
let toon = 0
let hand = 0
let kiezen = 0
radio.setGroup(1)
game.setScore(0)
start()
basic.forever(function () {
    if (kiezen > 0) {
        basic.showNumber(kiezen)
    } else {
        if (toon == 1 && andereHand >= 1) {
            while (toon == 1) {
                naarTeken(hand)
                basic.pause(500)
                naarTeken(andereHand)
                basic.pause(500)
                if (gewonnen(hand, andereHand) == 1) {
                    basic.showIcon(IconNames.Happy)
                    game.addScore(1)
                    music.playMelody("C D E F G A B C5 ", 500)
                } else if (gewonnen(hand, andereHand) == -1) {
                    basic.showIcon(IconNames.Sad)
                    game.addScore(-1)
                    music.playMelody("C5 B A G F E D C ", 500)
                } else {
                    basic.showIcon(IconNames.Heart)
                    music.playMelody("F F F F F F F F ", 500)
                }
                basic.showNumber(game.score())
                basic.pause(500)
            }
        } else {
            basic.showString("?")
        }
    }
})
