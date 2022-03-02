//
// generated from "Common.pd"
//

module.exports = new function () {
    this.KICK_REASON = {
        UNKNOWN: 0,
        JUST_KICK: 1,
        ANOTHER_LOGIN: 2,
        BLOCK: 3,
        GAMEMONEY_LOSE_LIMIT: 4,
        USER_LOGOUT: 5,
        NETWORK_STOP: 6
    }

    this.USER_TYPE = {
        PLAYER: 0,
        DEALER: 1,
        OBSERVER: 2,
        UNSEATED: 3,
        BOT: 4
    }

    this.USER_STATUS = {
        USER: 0,
        OPERATOR: 1,
        BLOCKED: 2
    }

    this.API_ACCESS_ROLE = {
        GAME: 1,
        ADMIN: 2,
        PUBLISHER: 4,
        ALL: 255
    }

    this.API_ACCESS_PERMIT = {
        LEVEL_0: 0,
        LEVEL_1: 1,
        LEVEL_2: 2,
        LEVEL_3: 3
    }

    this.NET_LENGTH = {
        STRING_4_LEN: 4,
        STRING_8_LEN: 8,
        STRING_16_LEN: 16,
        STRING_24_LEN: 24,
        STRING_32_LEN: 32,
        STRING_48_LEN: 48,
        STRING_64_LEN: 64,
        STRING_128_LEN: 128,
        STRING_256_LEN: 256,
        STRING_512_LEN: 512,
        STRING_2048_LEN: 2048,
        UUID_STRING_LEN: 36,
        DATETIME_LEN: 64,
        USER_SESSION_ID_LEN: 64,
        BROADCAST_LEN: 64
    }
}()
