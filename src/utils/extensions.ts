(BigInt.prototype as any).toJSON = function () {
    return parseInt(this.toString())
}

