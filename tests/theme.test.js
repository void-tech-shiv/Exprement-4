const {test}=require("node:test");const assert=require("node:assert/strict");const {resolveTheme,normalizePreference}=require("../script.js");
test("explicit themes override system",()=>{assert.equal(resolveTheme("light",true),"light");assert.equal(resolveTheme("dark",false),"dark");});
test("system follows OS preference",()=>{assert.equal(resolveTheme("system",true),"dark");assert.equal(resolveTheme("system",false),"light");});
test("invalid preferences fall back to system",()=>{assert.equal(normalizePreference(null),"system");assert.equal(normalizePreference("invalid"),"system");assert.equal(normalizePreference("dark"),"dark");assert.equal(resolveTheme("invalid",true),"dark");});
