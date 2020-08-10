
import * as pathlib from './path.js';
import * as script from './script.js';

test('runOnFile', () => {
    const scr = new script.Script('({name: "25"})', 'expr');
    const src = pathlib.path('/foo/bar/pikachu.png');
    const dst = script.runOnFile(scr, src);
    expect(dst).toEqual(pathlib.path('25.png'));
});

test('run identity', () => {
    const aq = new script.ActionQueue();
    const scr = new script.Script(` list(".").forEach(p => copy(p, p))`, 'expr');
    script.run(scr, "testsrc", aq);
    expect(aq.describe()).toEqual(expect.arrayContaining([
        {src: pathlib.path('testsrc/32.png'), dst: pathlib.path("./32.png")},
        {src: pathlib.path('testsrc/192-g-vsmogon.png'), dst: pathlib.path("./192-g-vsmogon.png")},
    ]));
});

