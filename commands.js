// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
'use strict';

function ReuseCommand(tchannelV1, coordinator, member, limit) {
    this.useTChannelV1 = tchannelV1;
    this.coordinator = coordinator;
    this.member = member;
    this.limit = limit;
}

function assertPositionArg(program, pos, arg) {
    if (program.args[pos]) return;
    console.error('Error: ' + arg + 'is required');
    process.exit(1);
}

function parseReuseCommand(program) {
    program
        .description('Undoes damping of member')
        .option('-m, --member <memberAddr>, Address of member to reuse')
        .option('-l, --limit <limit>, Parallelism limit')
        .option('--tchannel-v1')
        .usage('[options] <coordinator>');
    program.parse(process.argv);
    assertPositionArg(program, 0, 'coordinator');

    return new ReuseCommand(
        program.tchannelV1,
        program.args[0],
        program.member,
        program.limit || 25
    );
}

module.exports = {
    parseReuseCommand: parseReuseCommand
};