(() => {
  // js/data/meta.js
  var LIKERT_LABELS = [
    "\u5B8C\u5168\u4E0D\u7B26\u5408",
    "\u4E0D\u592A\u7B26\u5408",
    "\u4E00\u822C",
    "\u6BD4\u8F83\u7B26\u5408",
    "\u5B8C\u5168\u7B26\u5408"
  ];
  var SECTIONS = {
    bigfive: { label: "\u5927\u4E94\u4EBA\u683C", order: 0, desc: "IPIP-NEO \xB7 \u4EBA\u683C\u5FC3\u7406\u5B66\u91D1\u6807\u51C6" },
    facets: { label: "\u4EBA\u683C\u9762", order: 1, desc: "BFAS \xB7 \u5927\u4E94\u5404\u7EF4\u5EA6\u7684\u7CBE\u7EC6\u5B50\u9762" },
    hexaco: { label: "HEXACO", order: 2, desc: "\u8BDA\u5B9E-\u8C26\u900A \xB7 \u9053\u5FB7\u4EBA\u683C\u7EF4\u5EA6" },
    attachment: { label: "\u4F9D\u604B\u98CE\u683C", order: 3, desc: "ECR-R \xB7 \u4EB2\u5BC6\u5173\u7CFB\u6A21\u5F0F" },
    selfconcept: { label: "\u81EA\u6211\u6982\u5FF5", order: 4, desc: "RSES + GSE \xB7 \u81EA\u5C0A\u4E0E\u81EA\u6211\u6548\u80FD" },
    emotion: { label: "\u60C5\u7EEA\u80FD\u529B", order: 5, desc: "ERQ + TEIQue \xB7 \u60C5\u7EEA\u667A\u529B\u4E0E\u8C03\u8282" },
    values: { label: "\u6838\u5FC3\u4EF7\u503C", order: 6, desc: "Schwartz PVQ \xB7 \u9A71\u52A8\u4EBA\u751F\u7684\u4EF7\u503C\u5BFC\u5411" },
    motivation: { label: "\u52A8\u673A\u53D6\u5411", order: 7, desc: "\u8C03\u8282\u7126\u70B9 + \u5185\u63A7 + \u6210\u957F\u601D\u7EF4" },
    interpersonal: { label: "\u4EBA\u9645\u98CE\u683C", order: 8, desc: "TKI \xB7 \u51B2\u7A81\u4E0E\u793E\u4EA4\u5E94\u5BF9\u6A21\u5F0F" },
    career: { label: "\u804C\u4E1A\u5174\u8DA3", order: 9, desc: "Holland RIASEC \xB7 \u804C\u4E1A\u5174\u8DA3\u516D\u7EF4\u6A21\u578B" },
    cognitive: { label: "\u8BA4\u77E5\u98CE\u683C", order: 10, desc: "\u8BA4\u77E5\u52A0\u5DE5\u504F\u597D\uFF08\u5B9E\u8BC1\u63A8\u5BFC\uFF09" }
  };
  var TRAIT_META = {
    extraversion: { name: "\u5916\u5411\u6027", color: "#e0a050", low: "\u5185\u5411\u578B", high: "\u5916\u5411\u578B", lowDesc: "\u4F60\u4ECE\u72EC\u5904\u4E2D\u83B7\u5F97\u80FD\u91CF\uFF0C\u504F\u597D\u6DF1\u5EA6\u4EA4\u6D41\uFF0C\u601D\u8003\u540E\u518D\u8868\u8FBE\u3002", highDesc: "\u4F60\u4ECE\u793E\u4EA4\u4E2D\u83B7\u5F97\u80FD\u91CF\uFF0C\u5584\u4E8E\u8868\u8FBE\uFF0C\u4EAB\u53D7\u591A\u6837\u7684\u4EBA\u9645\u4F53\u9A8C\u3002" },
    agreeableness: { name: "\u5B9C\u4EBA\u6027", color: "#7eb88a", low: "\u72EC\u7ACB\u578B", high: "\u4EB2\u548C\u578B", lowDesc: "\u4F60\u91CD\u89C6\u5BA2\u89C2\u6807\u51C6\u4E0E\u6548\u7387\uFF0C\u5728\u51B3\u7B56\u4E2D\u4F18\u5148\u8003\u8651\u903B\u8F91\u3002", highDesc: "\u4F60\u5BCC\u6709\u540C\u7406\u5FC3\uFF0C\u91CD\u89C6\u548C\u8C10\uFF0C\u4E50\u4E8E\u5408\u4F5C\u5E76\u5173\u5FC3\u4ED6\u4EBA\u611F\u53D7\u3002" },
    conscientiousness: { name: "\u5C3D\u8D23\u6027", color: "#6a9fd4", low: "\u7075\u6D3B\u578B", high: "\u4E25\u8C28\u578B", lowDesc: "\u4F60\u9002\u5E94\u529B\u5F3A\uFF0C\u559C\u6B22\u7075\u6D3B\u5373\u5174\uFF0C\u5728\u5F00\u653E\u73AF\u5883\u4E2D\u8868\u73B0\u66F4\u597D\u3002", highDesc: "\u4F60\u81EA\u5F8B\u6709\u6761\u7406\uFF0C\u8BBE\u5B9A\u76EE\u6807\u5E76\u575A\u6301\u5B8C\u6210\uFF0C\u6CE8\u91CD\u7EC6\u8282\u4E0E\u53EF\u9760\u3002" },
    emotionalStability: { name: "\u60C5\u7EEA\u7A33\u5B9A\u6027", color: "#b08ad4", low: "\u654F\u611F\u578B", high: "\u7A33\u5B9A\u578B", lowDesc: "\u4F60\u5BF9\u60C5\u7EEA\u53D8\u5316\u8F83\u654F\u611F\uFF0C\u4F53\u9A8C\u60C5\u611F\u7684\u6DF1\u5EA6\u548C\u5F3A\u5EA6\u66F4\u9AD8\u3002", highDesc: "\u4F60\u60C5\u7EEA\u5E73\u7A33\uFF0C\u9762\u5BF9\u538B\u529B\u65F6\u4FDD\u6301\u51B7\u9759\uFF0C\u6062\u590D\u529B\u5F3A\u3002" },
    openness: { name: "\u5F00\u653E\u6027", color: "#d4748a", low: "\u52A1\u5B9E\u578B", high: "\u63A2\u7D22\u578B", lowDesc: "\u4F60\u504F\u597D\u5177\u4F53\u5B9E\u7528\u7684\u65B9\u6CD5\uFF0C\u91CD\u89C6\u5DF2\u88AB\u9A8C\u8BC1\u7684\u8DEF\u5F84\u3002", highDesc: "\u4F60\u597D\u5947\u5FC3\u5F3A\uFF0C\u5BCC\u6709\u60F3\u8C61\u529B\uFF0C\u4E50\u4E8E\u65B0\u4F53\u9A8C\u4E0E\u62BD\u8C61\u601D\u8003\u3002" },
    honestyHumility: { name: "\u8BDA\u5B9E-\u8C26\u900A", color: "#74c4b0", low: "\u81EA\u4FE1\u578B", high: "\u8C26\u900A\u578B", lowDesc: "\u4F60\u81EA\u4FE1\u679C\u65AD\uFF0C\u91CD\u89C6\u6210\u5C31\u4E0E\u5F71\u54CD\u529B\uFF0C\u5728\u7ADE\u4E89\u4E2D\u79EF\u6781\u4E89\u53D6\u3002", highDesc: "\u4F60\u771F\u8BDA\u516C\u5E73\u3001\u8C26\u900A\uFF0C\u91CD\u89C6\u5185\u5728\u4EF7\u503C\u800C\u975E\u5916\u5728\u540D\u5229\u3002" },
    attachmentAnxiety: { name: "\u4F9D\u604B\u7126\u8651", color: "#d4a574" },
    attachmentAvoidance: { name: "\u4F9D\u604B\u56DE\u907F", color: "#74a0d4" },
    selfEsteem: { name: "\u81EA\u5C0A\u6C34\u5E73", color: "#c4a574", low: "\u5F85\u63D0\u5347", high: "\u5065\u5EB7", lowDesc: "\u4F60\u6709\u65F6\u6000\u7591\u81EA\u8EAB\u4EF7\u503C\uFF0C\u5BB9\u6613\u53D7\u5916\u754C\u8BC4\u4EF7\u5F71\u54CD\u3002", highDesc: "\u4F60\u62E5\u6709\u7A33\u5B9A\u7684\u81EA\u6211\u4EF7\u503C\u611F\uFF0C\u80FD\u63A5\u7EB3\u81EA\u5DF1\u7684\u4F18\u70B9\u4E0E\u4E0D\u8DB3\u3002" },
    selfEfficacy: { name: "\u81EA\u6211\u6548\u80FD", color: "#6a9fd4", low: "\u8C28\u614E\u578B", high: "\u81EA\u4FE1\u578B", lowDesc: "\u9762\u5BF9\u6311\u6218\u65F6\u4F60\u53EF\u80FD\u4F4E\u4F30\u81EA\u5DF1\u7684\u80FD\u529B\uFF0C\u9700\u8981\u66F4\u591A\u6210\u529F\u7ECF\u9A8C\u79EF\u7D2F\u3002", highDesc: "\u4F60\u76F8\u4FE1\u81EA\u5DF1\u6709\u80FD\u529B\u5E94\u5BF9\u56F0\u96BE\uFF0C\u4E3B\u52A8\u8FCE\u63A5\u6311\u6218\u5E76\u575A\u6301\u52AA\u529B\u3002" },
    reappraisal: { name: "\u8BA4\u77E5\u91CD\u8BC4", color: "#7eb88a", low: "\u76F4\u89C9\u53CD\u5E94", high: "\u4E3B\u52A8\u8C03\u8282", lowDesc: "\u4F60\u8F83\u5C11\u4E3B\u52A8\u6539\u53D8\u5BF9\u4E8B\u4EF6\u7684\u89E3\u8BFB\u65B9\u5F0F\uFF0C\u60C5\u7EEA\u53D7\u60C5\u5883\u76F4\u63A5\u5F71\u54CD\u8F83\u591A\u3002", highDesc: "\u4F60\u5584\u4E8E\u4ECE\u4E0D\u540C\u89D2\u5EA6\u7406\u89E3\u4E8B\u4EF6\uFF0C\u4E3B\u52A8\u8C03\u6574\u60C5\u7EEA\u53CD\u5E94\uFF0C\u5FC3\u7406\u5F39\u6027\u5F3A\u3002" },
    suppression: { name: "\u8868\u8FBE\u6291\u5236", color: "#c47e7e", low: "\u81EA\u7136\u8868\u8FBE", high: "\u9AD8\u5EA6\u6291\u5236", lowDesc: "\u4F60\u80FD\u81EA\u7136\u8868\u8FBE\u60C5\u7EEA\uFF0C\u8F83\u5C11\u523B\u610F\u9690\u85CF\u5185\u5FC3\u611F\u53D7\u3002", highDesc: "\u4F60\u503E\u5411\u4E8E\u9690\u85CF\u60C5\u7EEA\u4E0D\u5916\u9732\uFF0C\u957F\u671F\u53EF\u80FD\u589E\u52A0\u5185\u5728\u538B\u529B\u3002" },
    emotionalAwareness: { name: "\u60C5\u7EEA\u89C9\u5BDF", color: "#b08ad4", low: "\u949D\u611F\u578B", high: "\u654F\u9510\u578B", lowDesc: "\u4F60\u5BF9\u60C5\u7EEA\u7684\u8BC6\u522B\u76F8\u5BF9\u7C97\u7565\uFF0C\u66F4\u5173\u6CE8\u5916\u90E8\u4E8B\u4EF6\u672C\u8EAB\u3002", highDesc: "\u4F60\u80FD\u7CBE\u51C6\u8BC6\u522B\u81EA\u5DF1\u548C\u4ED6\u4EBA\u7684\u60C5\u7EEA\uFF0C\u662F\u60C5\u5546\u7684\u91CD\u8981\u57FA\u7840\u3002" },
    emotionManagement: { name: "\u60C5\u7EEA\u7BA1\u7406", color: "#74c4b0", low: "\u5F85\u53D1\u5C55", high: "\u6210\u719F", lowDesc: "\u538B\u529B\u4E0B\u4F60\u53EF\u80FD\u88AB\u60C5\u7EEA\u4E3B\u5BFC\uFF0C\u4E8B\u540E\u624D\u610F\u8BC6\u5230\u53CD\u5E94\u8FC7\u6FC0\u3002", highDesc: "\u4F60\u80FD\u5728\u60C5\u7EEA\u6CE2\u52A8\u65F6\u4FDD\u6301\u4E00\u5B9A\u638C\u63A7\u529B\uFF0C\u9009\u62E9\u6070\u5F53\u7684\u8868\u8FBE\u65B9\u5F0F\u3002" },
    promotionFocus: { name: "\u4FC3\u8FDB\u7126\u70B9", color: "#e0a050", low: "\u4F4E", high: "\u9AD8", lowDesc: '\u4F60\u8F83\u5C11\u88AB"\u83B7\u5F97"\u548C"\u6210\u5C31"\u9A71\u52A8\u3002', highDesc: "\u4F60\u88AB\u6210\u957F\u3001\u6536\u83B7\u548C\u79EF\u6781\u7ED3\u679C\u9A71\u52A8\uFF0C\u4E50\u4E8E\u5192\u9669\u4E89\u53D6\u66F4\u597D\u3002" },
    preventionFocus: { name: "\u9884\u9632\u7126\u70B9", color: "#6a9fd4", low: "\u4F4E", high: "\u9AD8", lowDesc: '\u4F60\u8F83\u5C11\u88AB"\u907F\u514D\u635F\u5931"\u9A71\u52A8\u3002', highDesc: "\u4F60\u91CD\u89C6\u5B89\u5168\u4E0E\u7A33\u5B9A\uFF0C\u503E\u5411\u4E8E\u89C4\u907F\u98CE\u9669\u548C\u9519\u8BEF\u3002" },
    internalLocus: { name: "\u5185\u63A7\u503E\u5411", color: "#74c4b0", low: "\u5916\u63A7\u578B", high: "\u5185\u63A7\u578B", lowDesc: "\u4F60\u503E\u5411\u4E8E\u8BA4\u4E3A\u7ED3\u679C\u7531\u5916\u90E8\u56E0\u7D20\uFF08\u8FD0\u6C14\u3001\u4ED6\u4EBA\uFF09\u51B3\u5B9A\u3002", highDesc: "\u4F60\u76F8\u4FE1\u81EA\u5DF1\u80FD\u5F71\u54CD\u7ED3\u679C\uFF0C\u4E3B\u52A8\u627F\u62C5\u8D23\u4EFB\u5E76\u91C7\u53D6\u884C\u52A8\u3002" },
    growthMindset: { name: "\u6210\u957F\u601D\u7EF4", color: "#d4748a", low: "\u56FA\u5B9A\u578B", high: "\u6210\u957F\u578B", lowDesc: "\u4F60\u503E\u5411\u4E8E\u8BA4\u4E3A\u80FD\u529B\u662F\u5929\u751F\u7684\uFF0C\u5931\u8D25\u610F\u5473\u7740\u80FD\u529B\u4E0D\u8DB3\u3002", highDesc: "\u4F60\u76F8\u4FE1\u80FD\u529B\u53EF\u4EE5\u901A\u8FC7\u52AA\u529B\u53D1\u5C55\uFF0C\u628A\u632B\u6298\u89C6\u4E3A\u5B66\u4E60\u673A\u4F1A\u3002" },
    conflictCollaborating: { name: "\u5408\u4F5C\u578B\u51B2\u7A81", color: "#7eb88a", low: "\u4F4E", high: "\u9AD8", lowDesc: "\u51B2\u7A81\u4E2D\u4F60\u8F83\u5C11\u5BFB\u6C42\u53CC\u8D62\u65B9\u6848\u3002", highDesc: "\u4F60\u5584\u4E8E\u5728\u51B2\u7A81\u4E2D\u5BFB\u627E\u6EE1\u8DB3\u53CC\u65B9\u9700\u6C42\u7684\u89E3\u51B3\u65B9\u6848\u3002" },
    conflictAsserting: { name: "\u7ADE\u4E89\u578B\u51B2\u7A81", color: "#e0a050", low: "\u4F4E", high: "\u9AD8", lowDesc: "\u4F60\u5728\u51B2\u7A81\u4E2D\u503E\u5411\u4E8E\u9000\u8BA9\u6216\u56DE\u907F\u3002", highDesc: "\u4F60\u5728\u51B2\u7A81\u4E2D\u575A\u5B9A\u634D\u536B\u81EA\u5DF1\u7684\u7ACB\u573A\u548C\u5229\u76CA\u3002" }
  };
  var FACET_META = {
    intellect: { name: "\u667A\u529B\u63A2\u7D22", parent: "openness", color: "#d4748a", highDesc: "\u4F60\u70ED\u8877\u62BD\u8C61\u601D\u8003\u3001\u6982\u5FF5\u5206\u6790\u548C\u667A\u529B\u6311\u6218\u3002", lowDesc: "\u4F60\u66F4\u5173\u6CE8\u5B9E\u9645\u5E94\u7528\uFF0C\u5BF9\u7EAF\u7406\u8BBA\u8BA8\u8BBA\u5174\u8DA3\u6709\u9650\u3002" },
    aestheticOpenness: { name: "\u5BA1\u7F8E\u5F00\u653E", parent: "openness", color: "#e0889a", highDesc: "\u4F60\u5BF9\u827A\u672F\u3001\u7F8E\u611F\u548C\u611F\u5B98\u4F53\u9A8C\u6709\u5F3A\u70C8\u7684\u6B23\u8D4F\u529B\u3002", lowDesc: "\u4F60\u5BF9\u7F8E\u5B66\u4F53\u9A8C\u4E0D\u592A\u654F\u611F\uFF0C\u504F\u597D\u529F\u80FD\u6027\u7684\u4E8B\u7269\u3002" },
    industriousness: { name: "\u52E4\u52C9\u6027", parent: "conscientiousness", color: "#6a9fd4", highDesc: "\u4F60\u5DE5\u4F5C\u52AA\u529B\u3001\u8FFD\u6C42\u6210\u5C31\uFF0C\u6709\u5F3A\u70C8\u7684\u5B8C\u6210\u52A8\u529B\u3002", lowDesc: '\u4F60\u4E0D\u592A\u88AB"\u5B8C\u6210\u4EFB\u52A1"\u672C\u8EAB\u9A71\u52A8\uFF0C\u66F4\u968F\u5174\u800C\u4E3A\u3002' },
    orderliness: { name: "\u79E9\u5E8F\u6027", parent: "conscientiousness", color: "#5a8fc4", highDesc: "\u4F60\u6CE8\u91CD\u6574\u6D01\u3001\u7ED3\u6784\u548C\u89C4\u5219\uFF0C\u559C\u6B22\u4E00\u5207\u4E95\u4E95\u6709\u6761\u3002", lowDesc: "\u4F60\u5BF9\u79E9\u5E8F\u8981\u6C42\u4E0D\u9AD8\uFF0C\u5728\u6709\u4E9B\u6DF7\u4E71\u4E2D\u4E5F\u80FD\u81EA\u5728\u5DE5\u4F5C\u3002" },
    enthusiasm: { name: "\u70ED\u60C5\u6027", parent: "extraversion", color: "#e0a050", highDesc: "\u4F60\u70ED\u60C5\u5F00\u6717\uFF0C\u5BB9\u6613\u611F\u53D7\u5230\u5FEB\u4E50\u548C\u5174\u594B\u3002", lowDesc: "\u4F60\u7684\u60C5\u7EEA\u8868\u8FBE\u8F83\u4E3A\u514B\u5236\uFF0C\u5F88\u5C11\u8868\u73B0\u51FA\u6781\u5EA6\u5174\u594B\u3002" },
    assertiveness: { name: "\u679C\u65AD\u6027", parent: "extraversion", color: "#d09040", highDesc: "\u4F60\u6562\u4E8E\u8868\u8FBE\u89C2\u70B9\u3001\u5F15\u9886\u65B9\u5411\uFF0C\u5728\u7FA4\u4F53\u4E2D\u5E38\u62C5\u4EFB\u4E3B\u5BFC\u89D2\u8272\u3002", lowDesc: "\u4F60\u503E\u5411\u4E8E\u503E\u542C\u800C\u975E\u4E3B\u5BFC\uFF0C\u5728\u7FA4\u4F53\u4E2D\u66F4\u504F\u8DDF\u968F\u8005\u3002" },
    compassion: { name: "\u540C\u60C5\u5FC3", parent: "agreeableness", color: "#7eb88a", highDesc: "\u4F60\u5BF9\u4ED6\u4EBA\u75DB\u82E6\u9AD8\u5EA6\u654F\u611F\uFF0C\u5929\u7136\u60F3\u8981\u5E2E\u52A9\u548C\u5B89\u6170\u3002", lowDesc: "\u4F60\u66F4\u5173\u6CE8\u4E8B\u5B9E\u800C\u975E\u611F\u53D7\uFF0C\u8F83\u5C11\u88AB\u4ED6\u4EBA\u60C5\u7EEA\u7275\u52A8\u3002" },
    politeness: { name: "\u793C\u8C8C\u6027", parent: "agreeableness", color: "#6ea87a", highDesc: "\u4F60\u5C0A\u91CD\u793E\u4F1A\u89C4\u8303\uFF0C\u907F\u514D\u51B2\u7A81\u548C\u4E0D\u793C\u8C8C\u884C\u4E3A\u3002", lowDesc: "\u4F60\u66F4\u76F4\u63A5\u5766\u7387\uFF0C\u4E0D\u592A\u5728\u610F\u793E\u4EA4\u793C\u4EEA\u7684\u7EA6\u675F\u3002" },
    volatility: { name: "\u60C5\u7EEA\u6613\u53D8", parent: "neuroticism", color: "#b08ad4", highDesc: "\u4F60\u7684\u60C5\u7EEA\u53CD\u5E94\u5FEB\u901F\u4E14\u5F3A\u70C8\uFF0C\u5BB9\u6613\u56E0\u5C0F\u4E8B\u6CE2\u52A8\u3002", lowDesc: "\u4F60\u7684\u60C5\u7EEA\u53CD\u5E94\u5E73\u7F13\uFF0C\u5F88\u5C11\u56E0\u7410\u4E8B\u4EA7\u751F\u5267\u70C8\u6CE2\u52A8\u3002" },
    withdrawal: { name: "\u9000\u7F29\u503E\u5411", parent: "neuroticism", color: "#a07ac4", highDesc: "\u538B\u529B\u4E0B\u4F60\u503E\u5411\u9000\u7F29\u3001\u81EA\u6211\u6000\u7591\u548C\u793E\u4EA4\u56DE\u907F\u3002", lowDesc: "\u538B\u529B\u4E0B\u4F60\u4ECD\u80FD\u4FDD\u6301\u884C\u52A8\u529B\u548C\u793E\u4EA4\u610F\u613F\u3002" }
  };
  var VALUE_META = {
    selfDirection: { name: "\u81EA\u6211\u5BFC\u5411", color: "#d4748a", desc: "\u72EC\u7ACB\u601D\u8003\u548C\u521B\u9020\uFF0C\u6309\u81EA\u5DF1\u7684\u65B9\u5F0F\u751F\u6D3B" },
    benevolence: { name: "\u4EC1\u6148", color: "#7eb88a", desc: "\u5173\u5FC3\u8EAB\u8FB9\u4EBA\u7684\u798F\u7949\uFF0C\u7EF4\u62A4\u4EB2\u5BC6\u5173\u7CFB" },
    achievement: { name: "\u6210\u5C31", color: "#e0a050", desc: "\u901A\u8FC7\u80FD\u529B\u5C55\u793A\u83B7\u5F97\u793E\u4F1A\u8BA4\u53EF\u548C\u4E2A\u4EBA\u6210\u529F" },
    security: { name: "\u5B89\u5168", color: "#6a9fd4", desc: "\u8FFD\u6C42\u7A33\u5B9A\u3001\u548C\u8C10\u4E0E\u53EF\u9884\u6D4B\u7684\u73AF\u5883" },
    tradition: { name: "\u4F20\u7EDF", color: "#9a9288", desc: "\u5C0A\u91CD\u6587\u5316\u3001\u5B97\u6559\u548C\u5BB6\u65CF\u4E60\u4FD7" },
    stimulation: { name: "\u523A\u6FC0", color: "#c47e7e", desc: "\u8FFD\u6C42\u65B0\u5947\u3001\u5192\u9669\u548C\u611F\u5B98\u4F53\u9A8C" },
    universalism: { name: "\u666E\u4E16\u4E3B\u4E49", color: "#74c4b0", desc: "\u7406\u89E3\u3001\u5305\u5BB9\u548C\u4FDD\u62A4\u6240\u6709\u4EBA\u53CA\u81EA\u7136" },
    power: { name: "\u6743\u529B", color: "#d09040", desc: "\u8FFD\u6C42\u793E\u4F1A\u5730\u4F4D\u548C\u5BF9\u4ED6\u4EBA\u7684\u5F71\u54CD\u529B" }
  };
  var ATTACHMENT_TYPES = {
    secure: { name: "\u5B89\u5168\u578B\u4F9D\u604B", desc: "\u4F60\u5728\u4EB2\u5BC6\u5173\u7CFB\u4E2D\u611F\u5230\u8212\u9002\uFF0C\u65E2\u80FD\u4EAB\u53D7\u4EB2\u5BC6\u4E5F\u80FD\u4FDD\u6301\u72EC\u7ACB\u3002\u4F60\u4FE1\u4EFB\u4F34\u4FA3\uFF0C\u80FD\u6709\u6548\u6C9F\u901A\u60C5\u611F\u9700\u6C42\u3002" },
    anxious: { name: "\u7126\u8651\u578B\u4F9D\u604B", desc: "\u4F60\u6E34\u671B\u4EB2\u5BC6\u4F46\u62C5\u5FC3\u88AB\u629B\u5F03\uFF0C\u53EF\u80FD\u9700\u8981\u66F4\u591A\u5B89\u5168\u611F\u786E\u8BA4\u3002\u4F60\u60C5\u611F\u6295\u5165\u6DF1\uFF0C\u5BF9\u5173\u7CFB\u4FE1\u53F7\u975E\u5E38\u654F\u611F\u3002" },
    avoidant: { name: "\u56DE\u907F\u578B\u4F9D\u604B", desc: "\u4F60\u91CD\u89C6\u72EC\u7ACB\u548C\u81EA\u7ED9\u81EA\u8DB3\uFF0C\u53EF\u80FD\u5728\u4EB2\u5BC6\u5173\u7CFB\u4E2D\u4FDD\u6301\u60C5\u611F\u8DDD\u79BB\u3002\u4F60\u4E0D\u592A\u4E60\u60EF\u4F9D\u8D56\u4ED6\u4EBA\u6216\u5C55\u793A\u8106\u5F31\u3002" },
    fearful: { name: "\u6050\u60E7-\u56DE\u907F\u578B", desc: "\u4F60\u540C\u65F6\u6E34\u671B\u4EB2\u5BC6\u53C8\u5BB3\u6015\u53D7\u4F24\uFF0C\u5728\u9760\u8FD1\u548C\u9000\u7F29\u4E4B\u95F4\u6447\u6446\u3002\u7406\u89E3\u8FD9\u79CD\u6A21\u5F0F\u662F\u5EFA\u7ACB\u5B89\u5168\u5173\u7CFB\u7684\u7B2C\u4E00\u6B65\u3002" }
  };
  var ARCHETYPES = [
    { id: "visionary", name: "\u8FDC\u89C1\u63A2\u7D22\u8005", match: (s) => s.openness >= 60 && s.intellect >= 60 && s.promotionFocus >= 55, desc: "\u4F60\u4EE5\u597D\u5947\u5FC3\u548C\u667A\u529B\u9A71\u52A8\uFF0C\u4E0D\u65AD\u62D3\u5C55\u8BA4\u77E5\u8FB9\u754C\uFF0C\u5728\u521B\u65B0\u548C\u6218\u7565\u601D\u8003\u4E2D\u53D1\u5149\u3002" },
    { id: "architect", name: "\u7CBE\u5BC6\u5EFA\u9020\u8005", match: (s) => s.conscientiousness >= 65 && s.orderliness >= 60 && s.industriousness >= 60, desc: "\u4F60\u4EE5\u4E25\u8C28\u548C\u7CFB\u7EDF\u8457\u79F0\uFF0C\u5584\u4E8E\u5C06\u613F\u666F\u8F6C\u5316\u4E3A\u53EF\u6267\u884C\u7684\u5B8C\u7F8E\u8BA1\u5212\u3002" },
    { id: "harmonizer", name: "\u548C\u8C10\u5171\u60C5\u8005", match: (s) => s.agreeableness >= 65 && s.compassion >= 65 && s.benevolence >= 60, desc: "\u4F60\u5929\u7136\u611F\u77E5\u4ED6\u4EBA\u9700\u6C42\uFF0C\u662F\u56E2\u961F\u4E2D\u7684\u60C5\u611F\u7EBD\u5E26\u548C\u51B2\u7A81\u8C03\u89E3\u8005\u3002" },
    { id: "catalyst", name: "\u6D3B\u529B\u50AC\u5316\u5242", match: (s) => s.extraversion >= 65 && s.enthusiasm >= 65 && s.assertiveness >= 55, desc: "\u4F60\u7684\u70ED\u60C5\u548C\u8868\u8FBE\u529B\u611F\u67D3\u5468\u56F4\u7684\u4EBA\uFF0C\u5584\u4E8E\u6FC0\u53D1\u56E2\u961F\u80FD\u91CF\u3002" },
    { id: "guardian", name: "\u7A33\u5065\u5B88\u62A4\u8005", match: (s) => s.emotionalStability >= 60 && s.security >= 60 && s.preventionFocus >= 55, desc: "\u4F60\u53EF\u9760\u3001\u7A33\u5B9A\uFF0C\u662F\u5371\u673A\u4E2D\u7684\u5B9A\u6D77\u795E\u9488\uFF0C\u91CD\u89C6\u8D23\u4EFB\u548C\u5B89\u5168\u3002" },
    { id: "analyst", name: "\u51B7\u9759\u5206\u6790\u5E08", match: (s) => s.thinkingStyle >= 60 && s.internalLocus >= 60 && s.emotionalStability >= 55, desc: "\u4F60\u4EE5\u903B\u8F91\u548C\u5185\u63A7\u529B\u9A71\u52A8\u51B3\u7B56\uFF0C\u5728\u590D\u6742\u95EE\u9898\u4E2D\u4FDD\u6301\u5BA2\u89C2\u6E05\u6670\u3002" },
    { id: "idealist", name: "\u7406\u60F3\u4E3B\u4E49\u8005", match: (s) => s.universalism >= 60 && s.honestyHumility >= 60 && s.growthMindset >= 60, desc: "\u4F60\u8FFD\u6C42\u610F\u4E49\u548C\u6B63\u76F4\uFF0C\u76F8\u4FE1\u4E16\u754C\u53EF\u4EE5\u53D8\u5F97\u66F4\u597D\uFF0C\u5E76\u613F\u610F\u4E3A\u6B64\u884C\u52A8\u3002" },
    { id: "adapter", name: "\u7075\u6D3B\u9002\u5E94\u8005", match: (s) => s.openness >= 45 && s.conscientiousness <= 45 && s.reappraisal >= 55, desc: "\u4F60\u5728\u53D8\u5316\u4E2D\u5982\u9C7C\u5F97\u6C34\uFF0C\u5584\u4E8E\u5373\u5174\u53D1\u6325\u548C\u60C5\u7EEA\u8C03\u8282\u3002" },
    { id: "achiever", name: "\u6210\u5C31\u9A71\u52A8\u8005", match: (s) => s.achievement >= 65 && s.selfEfficacy >= 60 && s.industriousness >= 60, desc: "\u4F60\u76EE\u6807\u660E\u786E\u3001\u6548\u80FD\u611F\u5F3A\uFF0C\u6301\u7EED\u8FFD\u6C42\u4E2A\u4EBA\u7A81\u7834\u548C\u793E\u4F1A\u8BA4\u53EF\u3002" },
    { id: "reflective", name: "\u6DF1\u5EA6\u5185\u7701\u8005", match: (s) => s.extraversion <= 40 && s.openness >= 55 && s.emotionalAwareness >= 60, desc: "\u4F60\u4EAB\u53D7\u72EC\u5904\u601D\u8003\uFF0C\u5BF9\u5185\u5FC3\u4E16\u754C\u548C\u6DF1\u5C42\u610F\u4E49\u6709\u6301\u7EED\u63A2\u7D22\u3002" }
  ];
  var ARCHETYPE_DEFAULT = { id: "balanced", name: "\u591A\u5143\u5E73\u8861\u8005", desc: "\u4F60\u7684\u4EBA\u683C\u7279\u8D28\u5206\u5E03\u8F83\u4E3A\u5747\u8861\uFF0C\u6CA1\u6709\u5355\u4E00\u7EF4\u5EA6\u6781\u7AEF\u4E3B\u5BFC\u3002\u8FD9\u610F\u5473\u7740\u4F60\u5728\u4E0D\u540C\u60C5\u5883\u4E2D\u80FD\u7075\u6D3B\u5207\u6362\u6A21\u5F0F\uFF0C\u9002\u5E94\u6027\u662F\u4F60\u7684\u6838\u5FC3\u4F18\u52BF\u3002" };

  // js/data/questions-core.js
  var CORE_QUESTIONS = [
    // Extraversion
    { id: "E1", text: "\u6211\u662F\u805A\u4F1A\u7684\u7126\u70B9\u4EBA\u7269\u3002", scale: "extraversion", section: "bigfive" },
    { id: "E2", text: "\u6211\u5728\u4EBA\u7FA4\u4E2D\u611F\u5230\u81EA\u5728\u8212\u9002\u3002", scale: "extraversion", section: "bigfive" },
    { id: "E3", text: "\u6211\u5F88\u5BB9\u6613\u4E0E\u964C\u751F\u4EBA\u5F00\u59CB\u4EA4\u8C08\u3002", scale: "extraversion", section: "bigfive" },
    { id: "E4", text: "\u6211\u5728\u4EBA\u7FA4\u4E2D\u611F\u5230\u7CBE\u529B\u5145\u6C9B\u3002", scale: "extraversion", section: "bigfive" },
    { id: "E5", text: "\u6211\u5F88\u5C11\u4E3B\u52A8\u53D1\u8D77\u793E\u4EA4\u6D3B\u52A8\u3002", scale: "extraversion", reverse: true, section: "bigfive" },
    { id: "E6", text: "\u6211\u559C\u6B22\u6210\u4E3A\u6CE8\u610F\u529B\u7684\u4E2D\u5FC3\u3002", scale: "extraversion", section: "bigfive" },
    { id: "E7", text: "\u6211\u901A\u5E38\u6BD4\u8F83\u5B89\u9759\u548C\u5185\u655B\u3002", scale: "extraversion", reverse: true, section: "bigfive" },
    { id: "E8", text: "\u6211\u5584\u4E8E\u8868\u8FBE\u81EA\u5DF1\u7684\u60F3\u6CD5\u548C\u611F\u53D7\u3002", scale: "extraversion", section: "bigfive" },
    { id: "E9", text: "\u72EC\u5904\u65F6\u6211\u53CD\u800C\u66F4\u6709\u6D3B\u529B\u3002", scale: "extraversion", reverse: true, section: "bigfive" },
    { id: "E10", text: "\u6211\u559C\u6B22\u70ED\u95F9\u3001\u4EBA\u591A\u7684\u73AF\u5883\u3002", scale: "extraversion", section: "bigfive" },
    // Agreeableness
    { id: "A1", text: "\u6211\u5BF9\u4ED6\u4EBA\u7684\u611F\u53D7\u5F88\u654F\u611F\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A2", text: "\u6211\u5173\u5FC3\u4ED6\u4EBA\u7684\u798F\u7949\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A3", text: "\u6211\u5BB9\u6613\u539F\u8C05\u522B\u4EBA\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A4", text: "\u6211\u4FE1\u4EFB\u5927\u591A\u6570\u4EBA\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A5", text: "\u6211\u6709\u65F6\u4F1A\u6545\u610F\u8BF4\u4F24\u4EBA\u7684\u8BDD\u3002", scale: "agreeableness", reverse: true, section: "bigfive" },
    { id: "A6", text: "\u6211\u613F\u610F\u4E3A\u4E86\u548C\u8C10\u800C\u59A5\u534F\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A7", text: "\u6211\u5BF9\u4ED6\u4EBA\u7684\u56F0\u96BE\u7F3A\u4E4F\u8010\u5FC3\u3002", scale: "agreeableness", reverse: true, section: "bigfive" },
    { id: "A8", text: "\u6211\u4E50\u4E8E\u5E2E\u52A9\u6709\u9700\u8981\u7684\u4EBA\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A9", text: "\u6211\u8BA4\u4E3A\u5927\u591A\u6570\u4EBA\u672C\u8D28\u4E0A\u662F\u5584\u826F\u7684\u3002", scale: "agreeableness", section: "bigfive" },
    { id: "A10", text: "\u6211\u503E\u5411\u4E8E\u6311\u5254\u548C\u6279\u8BC4\u4ED6\u4EBA\u3002", scale: "agreeableness", reverse: true, section: "bigfive" },
    // Conscientiousness
    { id: "C1", text: "\u6211\u603B\u662F\u505A\u597D\u51C6\u5907\u3001\u6709\u6761\u7406\u3002", scale: "conscientiousness", section: "bigfive" },
    { id: "C2", text: "\u6211\u6CE8\u91CD\u7EC6\u8282\u3002", scale: "conscientiousness", section: "bigfive" },
    { id: "C3", text: "\u6211\u7ACB\u5373\u5F00\u59CB\u5E76\u5B8C\u6210\u5BB6\u52A1/\u4EFB\u52A1\u3002", scale: "conscientiousness", section: "bigfive" },
    { id: "C4", text: "\u6211\u9075\u5FAA\u65E5\u7A0B\u5B89\u6392\u3002", scale: "conscientiousness", section: "bigfive" },
    { id: "C5", text: "\u6211\u7ECF\u5E38\u628A\u91CD\u8981\u7684\u4E8B\u60C5\u62D6\u5230\u6700\u540E\u4E00\u523B\u3002", scale: "conscientiousness", reverse: true, section: "bigfive" },
    { id: "C6", text: "\u6211\u505A\u4E8B\u8FFD\u6C42\u7CBE\u786E\u548C\u5B8C\u7F8E\u3002", scale: "conscientiousness", section: "bigfive" },
    { id: "C7", text: "\u6211\u7684\u623F\u95F4\u548C\u684C\u9762\u901A\u5E38\u5F88\u51CC\u4E71\u3002", scale: "conscientiousness", reverse: true, section: "bigfive" },
    { id: "C8", text: "\u6211\u8BBE\u5B9A\u76EE\u6807\u5E76\u7CFB\u7EDF\u5730\u52AA\u529B\u5B9E\u73B0\u3002", scale: "conscientiousness", section: "bigfive" },
    { id: "C9", text: "\u6211\u6709\u65F6\u96BE\u4EE5\u575A\u6301\u5B8C\u6210\u8BA1\u5212\u3002", scale: "conscientiousness", reverse: true, section: "bigfive" },
    { id: "C10", text: "\u6211\u53EF\u9760\u4E14\u503C\u5F97\u4FE1\u8D56\u3002", scale: "conscientiousness", section: "bigfive" },
    // Neuroticism
    { id: "N1", text: "\u6211\u5BB9\u6613\u611F\u5230\u538B\u529B\u3002", scale: "neuroticism", section: "bigfive" },
    { id: "N2", text: "\u6211\u65F6\u5E38\u611F\u5230\u62C5\u5FE7\u3002", scale: "neuroticism", section: "bigfive" },
    { id: "N3", text: "\u6211\u5BB9\u6613\u611F\u5230\u6CAE\u4E27\u6216\u60C5\u7EEA\u4F4E\u843D\u3002", scale: "neuroticism", section: "bigfive" },
    { id: "N4", text: "\u6211\u5BF9\u6279\u8BC4\u975E\u5E38\u654F\u611F\u3002", scale: "neuroticism", section: "bigfive" },
    { id: "N5", text: "\u6211\u5927\u591A\u6570\u65F6\u5019\u60C5\u7EEA\u7A33\u5B9A\u3001\u5FC3\u6001\u5E73\u548C\u3002", scale: "neuroticism", reverse: true, section: "bigfive" },
    { id: "N6", text: "\u5C0F\u4E8B\u4E5F\u4F1A\u8BA9\u6211\u7126\u8651\u4E0D\u5B89\u3002", scale: "neuroticism", section: "bigfive" },
    { id: "N7", text: "\u6211\u5F88\u5C11\u611F\u5230\u7D27\u5F20\u6216\u4E0D\u5B89\u3002", scale: "neuroticism", reverse: true, section: "bigfive" },
    { id: "N8", text: "\u6211\u7684\u60C5\u7EEA\u6CE2\u52A8\u8F83\u5927\u3002", scale: "neuroticism", section: "bigfive" },
    { id: "N9", text: "\u9762\u5BF9\u56F0\u96BE\u65F6\u6211\u80FD\u4FDD\u6301\u51B7\u9759\u3002", scale: "neuroticism", reverse: true, section: "bigfive" },
    { id: "N10", text: "\u6211\u5BB9\u6613\u56E0\u632B\u6298\u800C\u6C14\u9981\u3002", scale: "neuroticism", section: "bigfive" },
    // Openness
    { id: "O1", text: "\u6211\u5BF9\u62BD\u8C61\u6982\u5FF5\u548C\u7406\u8BBA\u5F88\u611F\u5174\u8DA3\u3002", scale: "openness", section: "bigfive" },
    { id: "O2", text: "\u6211\u6709\u4E30\u5BCC\u7684\u60F3\u8C61\u529B\u3002", scale: "openness", section: "bigfive" },
    { id: "O3", text: "\u6211\u559C\u6B22\u63A2\u7D22\u65B0\u7684\u60F3\u6CD5\u548C\u89C2\u70B9\u3002", scale: "openness", section: "bigfive" },
    { id: "O4", text: "\u6211\u5BF9\u827A\u672F\u548C\u7F8E\u5B66\u6709\u6B23\u8D4F\u529B\u3002", scale: "openness", section: "bigfive" },
    { id: "O5", text: "\u6211\u66F4\u559C\u6B22\u719F\u6089\u7684\u4E8B\u7269\u800C\u975E\u65B0\u5947\u7684\u4F53\u9A8C\u3002", scale: "openness", reverse: true, section: "bigfive" },
    { id: "O6", text: "\u6211\u7ECF\u5E38\u601D\u8003\u5B58\u5728\u7684\u610F\u4E49\u548C\u6DF1\u5C42\u95EE\u9898\u3002", scale: "openness", section: "bigfive" },
    { id: "O7", text: "\u6211\u5BF9\u54F2\u5B66\u8BA8\u8BBA\u4E0D\u611F\u5174\u8DA3\u3002", scale: "openness", reverse: true, section: "bigfive" },
    { id: "O8", text: "\u6211\u559C\u6B22\u5C1D\u8BD5\u4E0D\u540C\u6587\u5316\u7684\u7F8E\u98DF\u548C\u4E60\u4FD7\u3002", scale: "openness", section: "bigfive" },
    { id: "O9", text: "\u6211\u503E\u5411\u4E8E\u7528\u4F20\u7EDF\u65B9\u5F0F\u505A\u4E8B\u3002", scale: "openness", reverse: true, section: "bigfive" },
    { id: "O10", text: "\u6211\u5BF9\u5B66\u4E60\u65B0\u6280\u80FD\u5145\u6EE1\u70ED\u60C5\u3002", scale: "openness", section: "bigfive" },
    // HEXACO H-H
    { id: "H1", text: "\u6211\u4F1A\u5229\u7528\u4ED6\u4EBA\u6765\u8FBE\u6210\u81EA\u5DF1\u7684\u76EE\u7684\u3002", scale: "honestyHumility", reverse: true, section: "hexaco" },
    { id: "H2", text: "\u6211\u8BA4\u4E3A\u901A\u8FC7\u6B3A\u9A97\u83B7\u53D6\u5229\u76CA\u662F\u53EF\u4EE5\u63A5\u53D7\u7684\u3002", scale: "honestyHumility", reverse: true, section: "hexaco" },
    { id: "H3", text: "\u6211\u671F\u671B\u5F97\u5230\u7279\u6B8A\u5F85\u9047\u548C\u989D\u5916\u7684\u597D\u5904\u3002", scale: "honestyHumility", reverse: true, section: "hexaco" },
    { id: "H4", text: "\u6211\u5BF9\u81EA\u5DF1\u7684\u80FD\u529B\u548C\u6210\u5C31\u4FDD\u6301\u8C26\u900A\u3002", scale: "honestyHumility", section: "hexaco" },
    { id: "H5", text: "\u5373\u4F7F\u6CA1\u4EBA\u77E5\u9053\uFF0C\u6211\u4E5F\u4E0D\u4F1A\u5360\u5C0F\u4FBF\u5B9C\u3002", scale: "honestyHumility", section: "hexaco" },
    { id: "H6", text: "\u91D1\u94B1\u548C\u7269\u8D28\u6210\u529F\u5BF9\u6211\u975E\u5E38\u91CD\u8981\u3002", scale: "honestyHumility", reverse: true, section: "hexaco" },
    { id: "H7", text: "\u6211\u771F\u8BDA\u5730\u5BF9\u5F85\u6BCF\u4E2A\u4EBA\uFF0C\u4E0D\u8BBA\u5176\u5730\u4F4D\u9AD8\u4F4E\u3002", scale: "honestyHumility", section: "hexaco" },
    { id: "H8", text: "\u4E3A\u4E86\u8D62\uFF0C\u6211\u6709\u65F6\u4E0D\u592A\u5728\u610F\u662F\u5426\u516C\u5E73\u3002", scale: "honestyHumility", reverse: true, section: "hexaco" },
    { id: "H9", text: "\u6211\u4E0D\u89C9\u5F97\u81EA\u5DF1\u6BD4\u522B\u4EBA\u66F4\u7279\u522B\u6216\u66F4\u91CD\u8981\u3002", scale: "honestyHumility", section: "hexaco" },
    { id: "H10", text: "\u6211\u4F1A\u5982\u5B9E\u627F\u8BA4\u81EA\u5DF1\u7684\u9519\u8BEF\u548C\u4E0D\u8DB3\u3002", scale: "honestyHumility", section: "hexaco" },
    // ECR-R
    { id: "AX1", text: "\u6211\u62C5\u5FC3\u4F34\u4FA3/\u4EB2\u5BC6\u7684\u4EBA\u4E0D\u591F\u7231\u6211\u3002", scale: "attachmentAnxiety", section: "attachment" },
    { id: "AX2", text: "\u6211\u5BB3\u6015\u88AB\u91CD\u8981\u7684\u4EBA\u629B\u5F03\u3002", scale: "attachmentAnxiety", section: "attachment" },
    { id: "AX3", text: "\u5F53\u4F34\u4FA3\u4E0D\u5728\u8EAB\u8FB9\u65F6\uFF0C\u6211\u4F1A\u611F\u5230\u4E0D\u5B89\u3002", scale: "attachmentAnxiety", section: "attachment" },
    { id: "AX4", text: "\u6211\u9700\u8981\u4F34\u4FA3\u9891\u7E41\u5730\u786E\u8BA4\u4ED6/\u5979\u7231\u6211\u3002", scale: "attachmentAnxiety", section: "attachment" },
    { id: "AX5", text: "\u6211\u5F88\u5C11\u62C5\u5FC3\u88AB\u4EB2\u8FD1\u7684\u4EBA\u62D2\u7EDD\u3002", scale: "attachmentAnxiety", reverse: true, section: "attachment" },
    { id: "AX6", text: "\u5F53\u5173\u7CFB\u53D8\u5F97\u4EB2\u5BC6\u65F6\uFF0C\u6211\u6709\u65F6\u4F1A\u611F\u5230\u7D27\u5F20\u3002", scale: "attachmentAnxiety", section: "attachment" },
    { id: "AV1", text: "\u6211\u4E0D\u592A\u613F\u610F\u5411\u4ED6\u4EBA\u5C55\u793A\u5185\u5FC3\u6DF1\u5904\u7684\u611F\u53D7\u3002", scale: "attachmentAvoidance", section: "attachment" },
    { id: "AV2", text: "\u5728\u4EB2\u5BC6\u5173\u7CFB\u4E2D\uFF0C\u6211\u503E\u5411\u4E8E\u4FDD\u6301\u4E00\u5B9A\u60C5\u611F\u8DDD\u79BB\u3002", scale: "attachmentAvoidance", section: "attachment" },
    { id: "AV3", text: "\u5411\u4ED6\u4EBA\u5B8C\u5168\u655E\u5F00\u5FC3\u6249\u8BA9\u6211\u4E0D\u592A\u8212\u670D\u3002", scale: "attachmentAvoidance", section: "attachment" },
    { id: "AV4", text: "\u6211\u503E\u5411\u4E8E\u5728\u60C5\u611F\u4E0A\u72EC\u7ACB\uFF0C\u4E0D\u4F9D\u8D56\u4ED6\u4EBA\u3002", scale: "attachmentAvoidance", section: "attachment" },
    { id: "AV5", text: "\u6211\u5F88\u5BB9\u6613\u5728\u4EB2\u5BC6\u5173\u7CFB\u4E2D\u5C55\u73B0\u8106\u5F31\u7684\u4E00\u9762\u3002", scale: "attachmentAvoidance", reverse: true, section: "attachment" },
    { id: "AV6", text: "\u6211\u4EAB\u53D7\u4E0E\u4F34\u4FA3/\u5BC6\u53CB\u4E4B\u95F4\u7684\u6DF1\u5EA6\u60C5\u611F\u8FDE\u63A5\u3002", scale: "attachmentAvoidance", reverse: true, section: "attachment" },
    // Cognitive
    { id: "CS1", text: "\u505A\u51B3\u5B9A\u65F6\uFF0C\u6211\u66F4\u4F9D\u8D56\u903B\u8F91\u5206\u6790\u800C\u975E\u4E2A\u4EBA\u611F\u53D7\u3002", scale: "thinkingFeeling", section: "cognitive" },
    { id: "CS2", text: "\u6211\u8BA4\u4E3A\u5BA2\u89C2\u4E8B\u5B9E\u6BD4\u4E3B\u89C2\u4F53\u9A8C\u66F4\u91CD\u8981\u3002", scale: "thinkingFeeling", section: "cognitive" },
    { id: "CS3", text: "\u6211\u4F18\u5148\u8003\u8651\u51B3\u5B9A\u5BF9\u4ED6\u4EBA\u7684\u60C5\u611F\u5F71\u54CD\u3002", scale: "thinkingFeeling", reverse: true, section: "cognitive" },
    { id: "CS4", text: "\u6211\u66F4\u559C\u6B22\u5173\u6CE8\u5177\u4F53\u4E8B\u5B9E\u548C\u5B9E\u9645\u7EC6\u8282\u3002", scale: "sensingIntuition", reverse: true, section: "cognitive" },
    { id: "CS5", text: "\u6211\u5584\u4E8E\u53D1\u73B0\u4E8B\u7269\u4E4B\u95F4\u7684\u6A21\u5F0F\u548C\u6F5C\u5728\u8054\u7CFB\u3002", scale: "sensingIntuition", section: "cognitive" },
    { id: "CS6", text: '\u6211\u66F4\u5173\u6CE8"\u53EF\u80FD\u662F\u4EC0\u4E48"\u800C\u975E"\u73B0\u5728\u662F\u4EC0\u4E48"\u3002', scale: "sensingIntuition", section: "cognitive" },
    { id: "CS7", text: "\u6211\u559C\u6B22\u63D0\u524D\u89C4\u5212\u5E76\u6309\u8BA1\u5212\u884C\u4E8B\u3002", scale: "judgingPerceiving", section: "cognitive" },
    { id: "CS8", text: "\u6211\u559C\u6B22\u4FDD\u6301\u9009\u62E9\u7684\u7075\u6D3B\u6027\uFF0C\u968F\u673A\u5E94\u53D8\u3002", scale: "judgingPerceiving", reverse: true, section: "cognitive" }
  ];
  var CONSISTENCY_PAIRS = [
    { a: "E4", b: "E9", maxDiff: 3 },
    { a: "A4", b: "A10", maxDiff: 3 },
    { a: "C1", b: "C7", maxDiff: 3 },
    { a: "N1", b: "N7", maxDiff: 3 },
    { a: "O3", b: "O9", maxDiff: 3 },
    { a: "SE1", b: "SE5", maxDiff: 3 }
  ];

  // js/data/questions-extended.js
  var EXTENDED_QUESTIONS = [
    // BFAS 人格面 (20)
    { id: "F01", text: "\u6211\u5BF9\u590D\u6742\u7406\u8BBA\u95EE\u9898\u548C\u62BD\u8C61\u6982\u5FF5\u5145\u6EE1\u5174\u8DA3\u3002", scale: "intellect", facet: "intellect", section: "facets" },
    { id: "F02", text: "\u6211\u559C\u6B22\u601D\u8003\u5B87\u5B99\u3001\u5B58\u5728\u7B49\u6DF1\u5C42\u54F2\u5B66\u95EE\u9898\u3002", scale: "intellect", facet: "intellect", section: "facets" },
    { id: "F03", text: "\u8BD7\u6B4C\u3001\u97F3\u4E50\u548C\u827A\u672F\u54C1\u5E38\u8BA9\u6211\u6DF1\u53D7\u89E6\u52A8\u3002", scale: "aestheticOpenness", facet: "aestheticOpenness", section: "facets" },
    { id: "F04", text: "\u6211\u4F1A\u88AB\u81EA\u7136\u7F8E\u666F\u548C\u8BBE\u8BA1\u7F8E\u5B66\u6DF1\u6DF1\u5438\u5F15\u3002", scale: "aestheticOpenness", facet: "aestheticOpenness", section: "facets" },
    { id: "F05", text: "\u6211\u5DE5\u4F5C\u52E4\u594B\uFF0C\u5F88\u5C11\u5077\u61D2\u6216\u6577\u884D\u3002", scale: "industriousness", facet: "industriousness", section: "facets" },
    { id: "F06", text: "\u4E00\u65E6\u5F00\u59CB\u4EFB\u52A1\uFF0C\u6211\u4F1A\u575A\u6301\u5230\u5B8C\u6210\u4E3A\u6B62\u3002", scale: "industriousness", facet: "industriousness", section: "facets" },
    { id: "F07", text: "\u6211\u559C\u6B22\u628A\u4E1C\u897F\u653E\u5728\u56FA\u5B9A\u4F4D\u7F6E\uFF0C\u4FDD\u6301\u6574\u6D01\u3002", scale: "orderliness", facet: "orderliness", section: "facets" },
    { id: "F08", text: "\u6211\u96BE\u4EE5\u5FCD\u53D7\u6DF7\u4E71\u548C\u65E0\u5E8F\u7684\u73AF\u5883\u3002", scale: "orderliness", facet: "orderliness", section: "facets" },
    { id: "F09", text: "\u6211\u5BB9\u6613\u611F\u5230\u5174\u594B\uFF0C\u5BF9\u751F\u6D3B\u5145\u6EE1\u70ED\u60C5\u3002", scale: "enthusiasm", facet: "enthusiasm", section: "facets" },
    { id: "F10", text: "\u6211\u7ECF\u5E38\u7B11\uFF0C\u4E5F\u5BB9\u6613\u611F\u67D3\u4ED6\u4EBA\u7684\u5FEB\u4E50\u3002", scale: "enthusiasm", facet: "enthusiasm", section: "facets" },
    { id: "F11", text: "\u6211\u6562\u4E8E\u5728\u7FA4\u4F53\u4E2D\u8868\u8FBE\u4E0D\u540C\u610F\u89C1\u3002", scale: "assertiveness", facet: "assertiveness", section: "facets" },
    { id: "F12", text: "\u6211\u4E60\u60EF\u5728\u56E2\u961F\u4E2D\u627F\u62C5\u9886\u5BFC\u548C\u51B3\u7B56\u89D2\u8272\u3002", scale: "assertiveness", facet: "assertiveness", section: "facets" },
    { id: "F13", text: "\u770B\u5230\u522B\u4EBA\u53D7\u82E6\uFF0C\u6211\u4F1A\u6253\u4ECE\u5FC3\u5E95\u611F\u5230\u5FC3\u75BC\u3002", scale: "compassion", facet: "compassion", section: "facets" },
    { id: "F14", text: "\u6211\u5F88\u96BE\u5BF9\u4ED6\u4EBA\u7684\u56F0\u96BE\u65E0\u52A8\u4E8E\u8877\u3002", scale: "compassion", facet: "compassion", section: "facets" },
    { id: "F15", text: "\u6211\u907F\u514D\u5BF9\u4ED6\u4EBA\u65E0\u793C\uFF0C\u5373\u4F7F\u5BF9\u65B9\u5148\u5931\u793C\u3002", scale: "politeness", facet: "politeness", section: "facets" },
    { id: "F16", text: "\u6211\u5C0A\u91CD\u6743\u5A01\u548C\u65E2\u5B9A\u89C4\u5219\uFF0C\u5F88\u5C11\u6545\u610F\u8FDD\u53CD\u3002", scale: "politeness", facet: "politeness", section: "facets" },
    { id: "F17", text: "\u6211\u7684\u60C5\u7EEA\u6765\u5F97\u5FEB\u53BB\u5F97\u4E5F\u5FEB\uFF0C\u5BB9\u6613\u6FC0\u52A8\u3002", scale: "volatility", facet: "volatility", section: "facets" },
    { id: "F18", text: "\u5C0F\u4E8B\u4E5F\u80FD\u8BA9\u6211\u77AC\u95F4\u60C5\u7EEA\u8D77\u4F0F\u3002", scale: "volatility", facet: "volatility", section: "facets" },
    { id: "F19", text: "\u611F\u5230\u538B\u529B\u65F6\uFF0C\u6211\u503E\u5411\u72EC\u5904\u3001\u51CF\u5C11\u793E\u4EA4\u3002", scale: "withdrawal", facet: "withdrawal", section: "facets" },
    { id: "F20", text: "\u632B\u6298\u540E\u6211\u5BB9\u6613\u9677\u5165\u81EA\u6211\u6000\u7591\u548C\u9000\u7F29\u3002", scale: "withdrawal", facet: "withdrawal", section: "facets" },
    // RSES (10)
    { id: "SE1", text: "\u603B\u4F53\u800C\u8A00\uFF0C\u6211\u5BF9\u81EA\u5DF1\u611F\u5230\u6EE1\u610F\u3002", scale: "selfEsteem", section: "selfconcept" },
    { id: "SE2", text: "\u6709\u65F6\u6211\u89C9\u5F97\u81EA\u5DF1\u4E00\u65E0\u662F\u5904\u3002", scale: "selfEsteem", reverse: true, section: "selfconcept" },
    { id: "SE3", text: "\u6211\u89C9\u5F97\u81EA\u5DF1\u662F\u4E00\u4E2A\u6709\u4EF7\u503C\u7684\u4EBA\uFF0C\u81F3\u5C11\u4E0E\u5176\u4ED6\u4EBA\u5E73\u7B49\u3002", scale: "selfEsteem", section: "selfconcept" },
    { id: "SE4", text: "\u6211\u5E0C\u671B\u80FD\u5BF9\u81EA\u5DF1\u66F4\u5C0A\u91CD\u4E00\u4E9B\u3002", scale: "selfEsteem", reverse: true, section: "selfconcept" },
    { id: "SE5", text: "\u6211\u65F6\u5E38\u611F\u5230\u81EA\u5DF1\u662F\u4E2A\u5931\u8D25\u8005\u3002", scale: "selfEsteem", reverse: true, section: "selfconcept" },
    { id: "SE6", text: "\u6211\u5BF9\u81EA\u5DF1\u6301\u6B63\u9762\u6001\u5EA6\u3002", scale: "selfEsteem", section: "selfconcept" },
    { id: "SE7", text: "\u603B\u7684\u6765\u8BF4\uFF0C\u6211\u5BF9\u81EA\u5DF1\u611F\u5230\u8BA4\u53EF\u3002", scale: "selfEsteem", section: "selfconcept" },
    { id: "SE8", text: "\u6211\u6709\u65F6\u771F\u7684\u5BF9\u81EA\u5DF1\u611F\u5230\u5931\u671B\u3002", scale: "selfEsteem", reverse: true, section: "selfconcept" },
    { id: "SE9", text: "\u6211\u6709\u65F6\u89C9\u5F97\u81EA\u5DF1\u4E0D\u5982\u522B\u4EBA\u3002", scale: "selfEsteem", reverse: true, section: "selfconcept" },
    { id: "SE10", text: "\u6211\u6709\u65F6\u8BA4\u4E3A\u81EA\u5DF1\u6BEB\u65E0\u7528\u5904\u3002", scale: "selfEsteem", reverse: true, section: "selfconcept" },
    // GSE (6)
    { id: "GSE1", text: "\u6211\u603B\u80FD\u627E\u5230\u529E\u6CD5\u89E3\u51B3\u56F0\u96BE\u7684\u95EE\u9898\u3002", scale: "selfEfficacy", section: "selfconcept" },
    { id: "GSE2", text: "\u5373\u4F7F\u6709\u4EBA\u53CD\u5BF9\u6211\uFF0C\u6211\u4E5F\u80FD\u8BBE\u6CD5\u5F97\u5230\u6211\u60F3\u8981\u7684\u3002", scale: "selfEfficacy", section: "selfconcept" },
    { id: "GSE3", text: "\u5BF9\u6211\u6765\u8BF4\uFF0C\u5B9E\u73B0\u76EE\u6807\u548C\u83B7\u5F97\u7ED3\u679C\u5F88\u5BB9\u6613\u3002", scale: "selfEfficacy", section: "selfconcept" },
    { id: "GSE4", text: "\u6211\u5BF9\u81EA\u5DF1\u9AD8\u6548\u5904\u7406\u610F\u5916\u4E8B\u4EF6\u7684\u80FD\u529B\u6709\u4FE1\u5FC3\u3002", scale: "selfEfficacy", section: "selfconcept" },
    { id: "GSE5", text: "\u4F9D\u9760\u6211\u7684\u673A\u667A\uFF0C\u6211\u77E5\u9053\u5982\u4F55\u5E94\u5BF9\u56F0\u96BE\u5904\u5883\u3002", scale: "selfEfficacy", section: "selfconcept" },
    { id: "GSE6", text: "\u9762\u4E34\u56F0\u96BE\u4EFB\u52A1\u65F6\uFF0C\u6211\u80FD\u51B7\u9759\u5730\u4F9D\u9760\u81EA\u5DF1\u3002", scale: "selfEfficacy", section: "selfconcept" },
    // ERQ (8)
    { id: "ER1", text: "\u6211\u4F1A\u6362\u4E2A\u89D2\u5EA6\u601D\u8003\uFF0C\u8BA9\u81EA\u5DF1\u4ECE\u4E0D\u6109\u5FEB\u7684\u60C5\u7EEA\u4E2D\u5E73\u590D\u3002", scale: "reappraisal", section: "emotion" },
    { id: "ER2", text: "\u6211\u4F1A\u601D\u8003\u5F53\u524D\u5904\u5883\u4E2D\u79EF\u6781\u7684\u4E00\u9762\uFF0C\u4EE5\u8C03\u8282\u60C5\u7EEA\u3002", scale: "reappraisal", section: "emotion" },
    { id: "ER3", text: "\u6211\u901A\u8FC7\u91CD\u65B0\u89E3\u8BFB\u60C5\u5883\u7684\u610F\u4E49\u6765\u6539\u53D8\u81EA\u5DF1\u7684\u611F\u53D7\u3002", scale: "reappraisal", section: "emotion" },
    { id: "ER4", text: "\u5F53\u6211\u60F3\u8981\u611F\u53D7\u66F4\u591A\u79EF\u6781\u60C5\u7EEA\u65F6\uFF0C\u6211\u4F1A\u6539\u53D8\u601D\u8003\u65B9\u5F0F\u3002", scale: "reappraisal", section: "emotion" },
    { id: "ER5", text: "\u6211\u4FDD\u6301\u6D88\u6781\u60C5\u7EEA\u4E0D\u5916\u9732\uFF0C\u4E0D\u8BA9\u522B\u4EBA\u770B\u51FA\u6765\u3002", scale: "suppression", section: "emotion" },
    { id: "ER6", text: "\u6211\u628A\u60C5\u7EEA\u85CF\u5728\u5FC3\u91CC\uFF0C\u4E0D\u8868\u73B0\u51FA\u6765\u3002", scale: "suppression", section: "emotion" },
    { id: "ER7", text: "\u6211\u63A7\u5236\u9762\u90E8\u8868\u60C5\uFF0C\u4EE5\u514D\u66B4\u9732\u771F\u5B9E\u611F\u53D7\u3002", scale: "suppression", section: "emotion" },
    { id: "ER8", text: "\u5373\u4F7F\u5185\u5FC3\u6CE2\u52A8\uFF0C\u6211\u4E5F\u5C3D\u91CF\u8868\u73B0\u5F97\u5E73\u9759\u3002", scale: "suppression", section: "emotion" },
    // EI (6)
    { id: "EI1", text: "\u6211\u6E05\u695A\u77E5\u9053\u81EA\u5DF1\u6B64\u523B\u7684\u60C5\u7EEA\u72B6\u6001\u3002", scale: "emotionalAwareness", section: "emotion" },
    { id: "EI2", text: "\u6211\u5584\u4E8E\u611F\u77E5\u4ED6\u4EBA\u672A\u8BF4\u51FA\u53E3\u7684\u60C5\u7EEA\u3002", scale: "emotionalAwareness", section: "emotion" },
    { id: "EI3", text: "\u6211\u80FD\u51C6\u786E\u63CF\u8FF0\u81EA\u5DF1\u590D\u6742\u7684\u6DF7\u5408\u60C5\u7EEA\u3002", scale: "emotionalAwareness", section: "emotion" },
    { id: "EI4", text: "\u6124\u6012\u6216\u7126\u8651\u65F6\uFF0C\u6211\u80FD\u9009\u62E9\u6070\u5F53\u7684\u8868\u8FBE\u65B9\u5F0F\u3002", scale: "emotionManagement", section: "emotion" },
    { id: "EI5", text: "\u6211\u80FD\u5728\u538B\u529B\u4E0B\u4FDD\u6301\u51B7\u9759\uFF0C\u4E0D\u88AB\u60C5\u7EEA\u51B2\u660F\u5934\u8111\u3002", scale: "emotionManagement", section: "emotion" },
    { id: "EI6", text: "\u6211\u5584\u4E8E\u5E2E\u52A9\u8EAB\u8FB9\u7684\u4EBA\u5904\u7406\u4ED6\u4EEC\u7684\u60C5\u7EEA\u95EE\u9898\u3002", scale: "emotionManagement", section: "emotion" },
    // Schwartz (8)
    { id: "V1", text: "\u81EA\u7531\u51B3\u5B9A\u505A\u4EC0\u4E48\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "selfDirection", section: "values" },
    { id: "V2", text: "\u5E2E\u52A9\u8EAB\u8FB9\u7684\u4EBA\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "benevolence", section: "values" },
    { id: "V3", text: "\u88AB\u4ED6\u4EBA\u8BA4\u53EF\u4E3A\u6210\u529F\u4EBA\u58EB\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "achievement", section: "values" },
    { id: "V4", text: "\u751F\u6D3B\u7A33\u5B9A\u3001\u6CA1\u6709\u610F\u5916\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "security", section: "values" },
    { id: "V5", text: "\u9075\u5FAA\u4F20\u7EDF\u4E60\u4FD7\u548C\u4FE1\u4EF0\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "tradition", section: "values" },
    { id: "V6", text: "\u5BFB\u6C42\u5192\u9669\u548C\u523A\u6FC0\u7684\u4F53\u9A8C\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "stimulation", section: "values" },
    { id: "V7", text: "\u793E\u4F1A\u516C\u5E73\u3001\u4EBA\u4EBA\u5E73\u7B49\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "universalism", section: "values" },
    { id: "V8", text: "\u62E5\u6709\u5F71\u54CD\u529B\u548C\u6743\u5A01\u5BF9\u6211\u5F88\u91CD\u8981\u3002", scale: "power", section: "values" },
    // Regulatory Focus (6)
    { id: "RF1", text: "\u6211\u4E13\u6CE8\u4E8E\u5B9E\u73B0\u6211\u7684\u62B1\u8D1F\u548C\u7406\u60F3\u3002", scale: "promotionFocus", section: "motivation" },
    { id: "RF2", text: "\u6211\u8FFD\u6C42\u8FDB\u6B65\uFF0C\u5E0C\u671B\u6BD4\u73B0\u72B6\u66F4\u597D\u3002", scale: "promotionFocus", section: "motivation" },
    { id: "RF3", text: '\u6211\u5173\u6CE8\u79EF\u6781\u7ED3\u679C\uFF0C\u601D\u8003\u5982\u4F55"\u83B7\u5F97"\u3002', scale: "promotionFocus", section: "motivation" },
    { id: "RF4", text: "\u6211\u4E13\u6CE8\u4E8E\u5C65\u884C\u8D23\u4EFB\u548C\u907F\u514D\u51FA\u9519\u3002", scale: "preventionFocus", section: "motivation" },
    { id: "RF5", text: "\u5B89\u5168\u8D77\u89C1\uFF0C\u6211\u503E\u5411\u4E8E\u9009\u62E9\u7A33\u59A5\u7684\u65B9\u6848\u3002", scale: "preventionFocus", section: "motivation" },
    { id: "RF6", text: "\u6211\u5173\u6CE8\u5982\u4F55\u907F\u514D\u5931\u8D25\u548C\u635F\u5931\u3002", scale: "preventionFocus", section: "motivation" },
    // Locus + Growth (8)
    { id: "LC1", text: "\u6211\u7684\u6210\u529F\u4E3B\u8981\u53D6\u51B3\u4E8E\u81EA\u5DF1\u7684\u52AA\u529B\u3002", scale: "internalLocus", section: "motivation" },
    { id: "LC2", text: "\u6211\u80FD\u5426\u8FBE\u6210\u76EE\u6807\uFF0C\u4E3B\u8981\u7531\u6211\u81EA\u5DF1\u638C\u63A7\u3002", scale: "internalLocus", section: "motivation" },
    { id: "LC3", text: "\u8FD0\u6C14\u5728\u6211\u7684\u751F\u6D3B\u4E2D\u8D77\u5F88\u5927\u4F5C\u7528\u3002", scale: "internalLocus", reverse: true, section: "motivation" },
    { id: "LC4", text: "\u9047\u5230\u632B\u6298\u65F6\uFF0C\u6211\u503E\u5411\u4E8E\u5F52\u56E0\u4E8E\u5916\u90E8\u56E0\u7D20\u3002", scale: "internalLocus", reverse: true, section: "motivation" },
    { id: "GM1", text: "\u4EBA\u7684\u667A\u529B\u53EF\u4EE5\u901A\u8FC7\u52AA\u529B\u663E\u8457\u63D0\u5347\u3002", scale: "growthMindset", section: "motivation" },
    { id: "GM2", text: "\u5931\u8D25\u662F\u5B66\u4E60\u548C\u6210\u957F\u7684\u673A\u4F1A\uFF0C\u800C\u975E\u80FD\u529B\u4E0D\u8DB3\u7684\u8BC1\u660E\u3002", scale: "growthMindset", section: "motivation" },
    { id: "GM3", text: "\u5929\u8D4B\u6BD4\u540E\u5929\u52AA\u529B\u66F4\u80FD\u51B3\u5B9A\u4E00\u4E2A\u4EBA\u80FD\u8D70\u591A\u8FDC\u3002", scale: "growthMindset", reverse: true, section: "motivation" },
    { id: "GM4", text: "\u6211\u53EF\u4EE5\u901A\u8FC7\u7EC3\u4E60\u5927\u5E45\u6539\u5584\u81EA\u5DF1\u4E0D\u64C5\u957F\u7684\u9886\u57DF\u3002", scale: "growthMindset", section: "motivation" },
    // Interpersonal (6)
    { id: "IP1", text: "\u51B2\u7A81\u4E2D\uFF0C\u6211\u5C1D\u8BD5\u627E\u5230\u53CC\u65B9\u90FD\u80FD\u63A5\u53D7\u7684\u65B9\u6848\u3002", scale: "conflictCollaborating", section: "interpersonal" },
    { id: "IP2", text: "\u6211\u91CD\u89C6\u5728\u51B2\u7A81\u4E2D\u7EF4\u62A4\u5F7C\u6B64\u7684\u5173\u7CFB\u3002", scale: "conflictCollaborating", section: "interpersonal" },
    { id: "IP3", text: "\u51B2\u7A81\u4E2D\u6211\u4F1A\u575A\u6301\u5DF1\u89C1\uFF0C\u76F4\u5230\u5BF9\u65B9\u8BA9\u6B65\u3002", scale: "conflictAsserting", section: "interpersonal" },
    { id: "IP4", text: "\u6211\u8BA4\u4E3A\u5728\u4E89\u8BBA\u4E2D\u83B7\u80DC\u5F88\u91CD\u8981\u3002", scale: "conflictAsserting", section: "interpersonal" },
    { id: "IP5", text: "\u6211\u503E\u5411\u4E8E\u56DE\u907F\u51B2\u7A81\uFF0C\u80FD\u5FCD\u5219\u5FCD\u3002", scale: "conflictAvoiding", section: "interpersonal" },
    { id: "IP6", text: "\u9762\u5BF9\u5206\u6B67\uFF0C\u6211\u901A\u5E38\u9009\u62E9\u4FDD\u6301\u6C89\u9ED8\u3002", scale: "conflictAvoiding", section: "interpersonal" }
  ];

  // js/data/careers.js
  var CAREER_QUESTIONS = [
    // R 实际型 Realistic
    { id: "R1", text: "\u6211\u559C\u6B22\u52A8\u624B\u4FEE\u7406\u3001\u7EC4\u88C5\u6216\u64CD\u4F5C\u673A\u68B0\u8BBE\u5907\u3002", scale: "realistic", section: "career" },
    { id: "R2", text: "\u5728\u6237\u5916\u6216\u73B0\u573A\u73AF\u5883\u4E2D\u5DE5\u4F5C\u8BA9\u6211\u66F4\u6709\u6D3B\u529B\u3002", scale: "realistic", section: "career" },
    { id: "R3", text: "\u6211\u4EAB\u53D7\u4F7F\u7528\u5DE5\u5177\u5B8C\u6210\u5177\u4F53\u3001\u53EF\u89C1\u7684\u6210\u679C\u3002", scale: "realistic", section: "career" },
    { id: "R4", text: "\u6211\u5BF9\u5DE5\u7A0B\u6280\u672F\u3001\u5EFA\u7B51\u6216\u673A\u68B0\u7C7B\u5DE5\u4F5C\u611F\u5174\u8DA3\u3002", scale: "realistic", section: "career" },
    { id: "R5", text: "\u6211\u504F\u597D\u770B\u5F97\u89C1\u6478\u5F97\u7740\u7684\u4EFB\u52A1\uFF0C\u800C\u975E\u62BD\u8C61\u8BA8\u8BBA\u3002", scale: "realistic", section: "career" },
    // I 研究型 Investigative
    { id: "I1", text: "\u6211\u559C\u6B22\u5206\u6790\u6570\u636E\u3001\u5BFB\u627E\u89C4\u5F8B\u5E76\u63D0\u51FA\u89E3\u91CA\u3002", scale: "investigative", section: "career" },
    { id: "I2", text: "\u89E3\u51B3\u590D\u6742\u7684\u667A\u529B\u96BE\u9898\u8BA9\u6211\u611F\u5230\u6EE1\u8DB3\u3002", scale: "investigative", section: "career" },
    { id: "I3", text: "\u6211\u5BF9\u79D1\u5B66\u7814\u7A76\u3001\u5B9E\u9A8C\u6216\u6DF1\u5EA6\u5206\u6790\u5DE5\u4F5C\u611F\u5174\u8DA3\u3002", scale: "investigative", section: "career" },
    { id: "I4", text: "\u6211\u4E50\u4E8E\u72EC\u7ACB\u63A2\u7D22\u672A\u77E5\u9886\u57DF\u548C\u95EE\u9898\u3002", scale: "investigative", section: "career" },
    { id: "I5", text: "\u9605\u8BFB\u4E13\u4E1A\u6587\u732E\u3001\u5B66\u4E60\u65B0\u77E5\u8BC6\u662F\u6211\u7684\u4E50\u8DA3\u3002", scale: "investigative", section: "career" },
    // A 艺术型 Artistic
    { id: "A1", text: "\u6211\u4EAB\u53D7\u901A\u8FC7\u5199\u4F5C\u3001\u8BBE\u8BA1\u6216\u8868\u6F14\u8868\u8FBE\u521B\u610F\u3002", scale: "artistic", section: "career" },
    { id: "A2", text: "\u975E\u7ED3\u6784\u5316\u7684\u3001\u81EA\u7531\u53D1\u6325\u7684\u5DE5\u4F5C\u73AF\u5883\u9002\u5408\u6211\u3002", scale: "artistic", section: "career" },
    { id: "A3", text: "\u6211\u5BF9\u97F3\u4E50\u3001\u89C6\u89C9\u827A\u672F\u6216\u521B\u610F\u4EA7\u4E1A\u611F\u5174\u8DA3\u3002", scale: "artistic", section: "career" },
    { id: "A4", text: "\u6211\u503E\u5411\u4E8E\u7528\u72EC\u7279\u3001\u539F\u521B\u7684\u65B9\u5F0F\u5B8C\u6210\u4EFB\u52A1\u3002", scale: "artistic", section: "career" },
    { id: "A5", text: "\u4E25\u683C\u7684\u6D41\u7A0B\u548C\u91CD\u590D\u6027\u5DE5\u4F5C\u4F1A\u538B\u6291\u6211\u7684\u521B\u9020\u529B\u3002", scale: "artistic", section: "career" },
    // S 社会型 Social
    { id: "S1", text: "\u5E2E\u52A9\u4ED6\u4EBA\u6210\u957F\u6216\u89E3\u51B3\u95EE\u9898\u8BA9\u6211\u611F\u5230\u6709\u610F\u4E49\u3002", scale: "social", section: "career" },
    { id: "S2", text: "\u6211\u5BF9\u6559\u80B2\u3001\u54A8\u8BE2\u6216\u533B\u62A4\u7C7B\u5DE5\u4F5C\u611F\u5174\u8DA3\u3002", scale: "social", section: "career" },
    { id: "S3", text: "\u6211\u5584\u4E8E\u503E\u542C\u5E76\u7406\u89E3\u4ED6\u4EBA\u7684\u9700\u6C42\u548C\u611F\u53D7\u3002", scale: "social", section: "career" },
    { id: "S4", text: "\u5728\u56E2\u961F\u4E2D\u652F\u6301\u548C\u534F\u8C03\u4ED6\u4EBA\u662F\u6211\u7684\u5F3A\u9879\u3002", scale: "social", section: "career" },
    { id: "S5", text: "\u6211\u5E0C\u671B\u5DE5\u4F5C\u80FD\u76F4\u63A5\u6539\u5584\u4ED6\u4EBA\u7684\u751F\u6D3B\u3002", scale: "social", section: "career" },
    // E 企业型 Enterprising
    { id: "E1", text: "\u6211\u559C\u6B22\u8BF4\u670D\u3001\u5F71\u54CD\u4ED6\u4EBA\u5E76\u63A8\u52A8\u4E8B\u60C5\u53D1\u751F\u3002", scale: "enterprising", section: "career" },
    { id: "E2", text: "\u6211\u5BF9\u521B\u4E1A\u3001\u7BA1\u7406\u6216\u9500\u552E\u7C7B\u5DE5\u4F5C\u611F\u5174\u8DA3\u3002", scale: "enterprising", section: "career" },
    { id: "E3", text: "\u5728\u7ADE\u4E89\u4E2D\u83B7\u80DC\u3001\u8FBE\u6210\u76EE\u6807\u8BA9\u6211\u5145\u6EE1\u52A8\u529B\u3002", scale: "enterprising", section: "career" },
    { id: "E4", text: "\u6211\u4E50\u4E8E\u627F\u62C5\u98CE\u9669\u4EE5\u83B7\u53D6\u66F4\u5927\u7684\u56DE\u62A5\u548C\u5F71\u54CD\u529B\u3002", scale: "enterprising", section: "career" },
    { id: "E5", text: "\u6211\u64C5\u957F\u5728\u4E0D\u786E\u5B9A\u73AF\u5883\u4E2D\u505A\u51B3\u7B56\u5E76\u5E26\u9886\u56E2\u961F\u3002", scale: "enterprising", section: "career" },
    // C 常规型 Conventional
    { id: "C1", text: "\u6211\u64C5\u957F\u5904\u7406\u6570\u636E\u3001\u6587\u6863\u548C\u7CBE\u786E\u7684\u7EC6\u8282\u5DE5\u4F5C\u3002", scale: "conventional", section: "career" },
    { id: "C2", text: "\u6709\u660E\u786E\u89C4\u5219\u548C\u6D41\u7A0B\u7684\u5DE5\u4F5C\u73AF\u5883\u8BA9\u6211\u5B89\u5FC3\u3002", scale: "conventional", section: "career" },
    { id: "C3", text: "\u6211\u5BF9\u8D22\u52A1\u3001\u884C\u653F\u6216\u4FE1\u606F\u7BA1\u7406\u7C7B\u5DE5\u4F5C\u611F\u5174\u8DA3\u3002", scale: "conventional", section: "career" },
    { id: "C4", text: "\u6211\u6CE8\u91CD\u51C6\u786E\u6027\u548C\u6548\u7387\uFF0C\u5F88\u5C11\u51FA\u7EB0\u6F0F\u3002", scale: "conventional", section: "career" },
    { id: "C5", text: "\u6211\u504F\u597D\u7A33\u5B9A\u3001\u53EF\u9884\u671F\u7684\u5DE5\u4F5C\u8282\u594F\u548C\u804C\u8D23\u3002", scale: "conventional", section: "career" }
  ];
  var RIASEC_META = {
    realistic: {
      code: "R",
      name: "\u5B9E\u9645\u578B",
      color: "#8B7355",
      desc: "\u504F\u597D\u52A8\u624B\u64CD\u4F5C\u3001\u4F7F\u7528\u5DE5\u5177\u548C\u4E0E\u5B9E\u7269\u6253\u4EA4\u9053\u3002\u559C\u6B22\u5177\u4F53\u3001\u6709\u660E\u786E\u7ED3\u679C\u7684\u4EFB\u52A1\u3002",
      env: "\u7ED3\u6784\u5316\u73B0\u573A\u73AF\u5883\uFF0C\u5F3A\u8C03\u5B9E\u64CD\u6280\u80FD\u4E0E\u4F53\u529B/\u6280\u672F\u534F\u8C03",
      traits: ["\u52A1\u5B9E", "\u673A\u68B0\u5BFC\u5411", "\u4F53\u529B/\u64CD\u4F5C"]
    },
    investigative: {
      code: "I",
      name: "\u7814\u7A76\u578B",
      color: "#6a9fd4",
      desc: "\u504F\u597D\u89C2\u5BDF\u3001\u5206\u6790\u3001\u7814\u7A76\u548C\u89E3\u51B3\u590D\u6742\u95EE\u9898\u3002\u559C\u6B22\u72EC\u7ACB\u601D\u8003\u548C\u667A\u529B\u6311\u6218\u3002",
      env: "\u7814\u7A76\u578B\u6216\u5206\u6790\u578B\u73AF\u5883\uFF0C\u9F13\u52B1\u63A2\u7D22\u4E0E\u72EC\u7ACB\u5DE5\u4F5C",
      traits: ["\u5206\u6790", "\u597D\u5947", "\u72EC\u7ACB"]
    },
    artistic: {
      code: "A",
      name: "\u827A\u672F\u578B",
      color: "#d4748a",
      desc: "\u504F\u597D\u521B\u9020\u3001\u8868\u8FBE\u548C\u5BA1\u7F8E\u6D3B\u52A8\u3002\u559C\u6B22\u975E\u7ED3\u6784\u5316\u548C\u539F\u521B\u6027\u7684\u5DE5\u4F5C\u65B9\u5F0F\u3002",
      env: "\u7075\u6D3B\u81EA\u7531\u7684\u521B\u610F\u73AF\u5883\uFF0C\u5BB9\u5FCD\u6A21\u7CCA\u6027\u548C\u4E2A\u6027\u5316\u8868\u8FBE",
      traits: ["\u521B\u610F", "\u8868\u8FBE", "\u5BA1\u7F8E"]
    },
    social: {
      code: "S",
      name: "\u793E\u4F1A\u578B",
      color: "#7eb88a",
      desc: "\u504F\u597D\u5E2E\u52A9\u3001\u6559\u5BFC\u548C\u670D\u52A1\u4ED6\u4EBA\u3002\u4ECE\u4EBA\u9645\u4E92\u52A8\u548C\u5229\u4ED6\u884C\u4E3A\u4E2D\u83B7\u5F97\u6EE1\u8DB3\u3002",
      env: "\u534F\u4F5C\u4E92\u52A9\u7684\u56E2\u961F\u73AF\u5883\uFF0C\u5F3A\u8C03\u6C9F\u901A\u4E0E\u5171\u60C5",
      traits: ["\u5171\u60C5", "\u5408\u4F5C", "\u670D\u52A1"]
    },
    enterprising: {
      code: "E",
      name: "\u4F01\u4E1A\u578B",
      color: "#e0a050",
      desc: "\u504F\u597D\u9886\u5BFC\u3001\u8BF4\u670D\u548C\u5F71\u54CD\u4ED6\u4EBA\u3002\u4EAB\u53D7\u7ADE\u4E89\u3001\u5192\u9669\u548C\u8FBE\u6210\u5546\u4E1A/\u7EC4\u7EC7\u76EE\u6807\u3002",
      env: "\u52A8\u6001\u7ADE\u4E89\u578B\u73AF\u5883\uFF0C\u5F3A\u8C03\u51B3\u7B56\u529B\u4E0E\u5F71\u54CD\u529B",
      traits: ["\u9886\u5BFC", "\u8BF4\u670D", "\u5192\u9669"]
    },
    conventional: {
      code: "C",
      name: "\u5E38\u89C4\u578B",
      color: "#74a0d4",
      desc: "\u504F\u597D\u7EC4\u7EC7\u3001\u8BB0\u5F55\u548C\u6570\u636E\u7BA1\u7406\u3002\u559C\u6B22\u6709\u89C4\u5219\u3001\u53EF\u9884\u671F\u7684\u7CFB\u7EDF\u5316\u5DE5\u4F5C\u3002",
      env: "\u89C4\u8303\u6709\u5E8F\u7684\u4E8B\u52A1\u578B\u73AF\u5883\uFF0C\u5F3A\u8C03\u7CBE\u786E\u4E0E\u6D41\u7A0B",
      traits: ["\u6761\u7406", "\u7CBE\u786E", "\u7A33\u5B9A"]
    }
  };
  var CAREER_DATABASE = [
    { title: "\u8F6F\u4EF6\u5DE5\u7A0B\u5E08", codes: "IRC", tags: ["investigative", "realistic", "conventional"], desc: "\u8BBE\u8BA1\u5F00\u53D1\u8F6F\u4EF6\u7CFB\u7EDF\uFF0C\u7ED3\u5408\u903B\u8F91\u5206\u6790\u4E0E\u7ED3\u6784\u5316\u5B9E\u73B0\u3002" },
    { title: "\u6570\u636E\u79D1\u5B66\u5BB6", codes: "IAS", tags: ["investigative", "artistic", "conventional"], desc: "\u4ECE\u6570\u636E\u4E2D\u53D1\u73B0\u89C4\u5F8B\uFF0C\u6784\u5EFA\u6A21\u578B\u652F\u6301\u51B3\u7B56\u3002" },
    { title: "\u4EA7\u54C1\u7ECF\u7406", codes: "EAS", tags: ["enterprising", "artistic", "social"], desc: "\u8FDE\u63A5\u7528\u6237\u9700\u6C42\u4E0E\u6280\u672F\u5B9E\u73B0\uFF0C\u63A8\u52A8\u4EA7\u54C1\u843D\u5730\u3002" },
    { title: "UX/UI \u8BBE\u8BA1\u5E08", codes: "AES", tags: ["artistic", "enterprising", "social"], desc: "\u4EE5\u7528\u6237\u4E3A\u4E2D\u5FC3\u8BBE\u8BA1\u754C\u9762\u4E0E\u4EA4\u4E92\u4F53\u9A8C\u3002" },
    { title: "\u5FC3\u7406\u54A8\u8BE2\u5E08", codes: "SAI", tags: ["social", "artistic", "investigative"], desc: "\u8FD0\u7528\u5FC3\u7406\u5B66\u77E5\u8BC6\u5E2E\u52A9\u6765\u8BBF\u8005\u89E3\u51B3\u60C5\u7EEA\u4E0E\u884C\u4E3A\u95EE\u9898\u3002" },
    { title: "\u6559\u5E08 / \u57F9\u8BAD\u5E08", codes: "SAE", tags: ["social", "artistic", "enterprising"], desc: "\u4F20\u6388\u77E5\u8BC6\u3001\u5F15\u5BFC\u6210\u957F\uFF0C\u5F71\u54CD\u4ED6\u4EBA\u53D1\u5C55\u8F68\u8FF9\u3002" },
    { title: "\u533B\u751F / \u62A4\u58EB", codes: "SIR", tags: ["social", "investigative", "realistic"], desc: "\u8FD0\u7528\u533B\u5B66\u77E5\u8BC6\u8BCA\u65AD\u6CBB\u7597\uFF0C\u76F4\u63A5\u6539\u5584\u60A3\u8005\u5065\u5EB7\u3002" },
    { title: "\u5F8B\u5E08", codes: "EIS", tags: ["enterprising", "investigative", "social"], desc: "\u5206\u6790\u6CD5\u5F8B\u95EE\u9898\uFF0C\u4EE3\u8868\u5BA2\u6237\u4E89\u53D6\u6743\u76CA\u3002" },
    { title: "\u7BA1\u7406\u54A8\u8BE2\u987E\u95EE", codes: "EIS", tags: ["enterprising", "investigative", "social"], desc: "\u4E3A\u4F01\u4E1A\u63D0\u4F9B\u6218\u7565\u4E0E\u8FD0\u8425\u89E3\u51B3\u65B9\u6848\u3002" },
    { title: "\u521B\u4E1A\u8005 / CEO", codes: "EAS", tags: ["enterprising", "artistic", "social"], desc: "\u521B\u5EFA\u5E76\u9886\u5BFC\u7EC4\u7EC7\uFF0C\u627F\u62C5\u98CE\u9669\u8FFD\u6C42\u613F\u666F\u3002" },
    { title: "\u5E02\u573A\u8425\u9500\u7ECF\u7406", codes: "EAS", tags: ["enterprising", "artistic", "social"], desc: "\u7B56\u5212\u63A8\u5E7F\u7B56\u7565\uFF0C\u8FDE\u63A5\u54C1\u724C\u4E0E\u6D88\u8D39\u8005\u3002" },
    { title: "\u9500\u552E\u7ECF\u7406", codes: "ESR", tags: ["enterprising", "social", "realistic"], desc: "\u5EFA\u7ACB\u5BA2\u6237\u5173\u7CFB\uFF0C\u63A8\u52A8\u5546\u4E1A\u6210\u4EA4\u3002" },
    { title: "\u8D22\u52A1\u5206\u6790\u5E08", codes: "CIR", tags: ["conventional", "investigative", "realistic"], desc: "\u5206\u6790\u8D22\u52A1\u6570\u636E\uFF0C\u652F\u6301\u6295\u8D44\u4E0E\u7ECF\u8425\u51B3\u7B56\u3002" },
    { title: "\u4F1A\u8BA1\u5E08", codes: "CSE", tags: ["conventional", "social", "enterprising"], desc: "\u7BA1\u7406\u8D22\u52A1\u8BB0\u5F55\uFF0C\u786E\u4FDD\u5408\u89C4\u4E0E\u51C6\u786E\u3002" },
    { title: "\u884C\u653F\u4E3B\u7BA1", codes: "CES", tags: ["conventional", "enterprising", "social"], desc: "\u534F\u8C03\u7EC4\u7EC7\u8FD0\u8425\uFF0C\u7EF4\u62A4\u9AD8\u6548\u884C\u653F\u4F53\u7CFB\u3002" },
    { title: "\u571F\u6728\u5DE5\u7A0B\u5E08", codes: "RIC", tags: ["realistic", "investigative", "conventional"], desc: "\u8BBE\u8BA1\u5EFA\u9020\u57FA\u7840\u8BBE\u65BD\uFF0C\u89E3\u51B3\u5DE5\u7A0B\u5B9E\u9645\u95EE\u9898\u3002" },
    { title: "\u673A\u68B0\u5DE5\u7A0B\u5E08", codes: "RIC", tags: ["realistic", "investigative", "conventional"], desc: "\u8BBE\u8BA1\u5F00\u53D1\u548C\u7EF4\u62A4\u673A\u68B0\u7CFB\u7EDF\u4E0E\u8BBE\u5907\u3002" },
    { title: "\u5EFA\u7B51\u5E08", codes: "AIR", tags: ["artistic", "investigative", "realistic"], desc: "\u878D\u5408\u7F8E\u5B66\u4E0E\u529F\u80FD\u8BBE\u8BA1\u5EFA\u7B51\u7A7A\u95F4\u3002" },
    { title: "\u5E73\u9762\u8BBE\u8BA1\u5E08", codes: "AES", tags: ["artistic", "enterprising", "social"], desc: "\u521B\u9020\u89C6\u89C9\u4F20\u8FBE\u4F5C\u54C1\uFF0C\u4F20\u9012\u54C1\u724C\u4E0E\u4FE1\u606F\u3002" },
    { title: "\u4F5C\u5BB6 / \u7F16\u8F91", codes: "ASI", tags: ["artistic", "social", "investigative"], desc: "\u901A\u8FC7\u6587\u5B57\u521B\u4F5C\u4E0E\u7F16\u8F91\u4F20\u9012\u601D\u60F3\u4E0E\u6545\u4E8B\u3002" },
    { title: "\u97F3\u4E50\u5236\u4F5C\u4EBA", codes: "AES", tags: ["artistic", "enterprising", "social"], desc: "\u521B\u4F5C\u7F16\u6392\u97F3\u4E50\uFF0C\u7BA1\u7406\u827A\u672F\u9879\u76EE\u3002" },
    { title: "\u7814\u7A76\u5458 / \u79D1\u5B66\u5BB6", codes: "IAS", tags: ["investigative", "artistic", "social"], desc: "\u7CFB\u7EDF\u63A2\u7D22\u81EA\u7136\u89C4\u5F8B\u6216\u793E\u4F1A\u73B0\u8C61\u3002" },
    { title: "\u4EBA\u529B\u8D44\u6E90\u7ECF\u7406", codes: "ESA", tags: ["enterprising", "social", "artistic"], desc: "\u7BA1\u7406\u4EBA\u624D\u62DB\u8058\u3001\u53D1\u5C55\u4E0E\u7EC4\u7EC7\u6587\u5316\u3002" },
    { title: "\u793E\u4F1A\u5DE5\u4F5C\u8005", codes: "SAE", tags: ["social", "artistic", "enterprising"], desc: "\u4E3A\u5F31\u52BF\u7FA4\u4F53\u63D0\u4F9B\u652F\u6301\u4E0E\u8D44\u6E90\u94FE\u63A5\u3002" },
    { title: "\u9879\u76EE\u7ECF\u7406", codes: "ECS", tags: ["enterprising", "conventional", "social"], desc: "\u89C4\u5212\u6267\u884C\u9879\u76EE\uFF0C\u534F\u8C03\u8D44\u6E90\u4E0E\u8FDB\u5EA6\u3002" },
    { title: "\u8FD0\u8425\u7ECF\u7406", codes: "ECS", tags: ["enterprising", "conventional", "social"], desc: "\u4F18\u5316\u4E1A\u52A1\u6D41\u7A0B\uFF0C\u4FDD\u969C\u7EC4\u7EC7\u65E5\u5E38\u8FD0\u8F6C\u3002" },
    { title: "\u7535\u6C14\u6280\u5E08", codes: "RCI", tags: ["realistic", "conventional", "investigative"], desc: "\u5B89\u88C5\u7EF4\u62A4\u7535\u6C14\u7CFB\u7EDF\uFF0C\u89E3\u51B3\u73B0\u573A\u6280\u672F\u95EE\u9898\u3002" },
    { title: "\u53A8\u5E08", codes: "RAE", tags: ["realistic", "artistic", "enterprising"], desc: "\u7ED3\u5408\u6280\u827A\u4E0E\u521B\u610F\u5236\u4F5C\u9910\u996E\u4F5C\u54C1\u3002" },
    { title: "\u8FD0\u52A8\u5458 / \u6559\u7EC3", codes: "RES", tags: ["realistic", "enterprising", "social"], desc: "\u901A\u8FC7\u4F53\u80FD\u8BAD\u7EC3\u4E0E\u6307\u5BFC\u8FFD\u6C42\u7ADE\u6280\u5353\u8D8A\u3002" },
    { title: "\u516C\u52A1\u5458", codes: "CSE", tags: ["conventional", "social", "enterprising"], desc: "\u5728\u516C\u5171\u90E8\u95E8\u6267\u884C\u653F\u7B56\uFF0C\u670D\u52A1\u793E\u4F1A\u3002" },
    { title: "\u6295\u8D44\u5206\u6790\u5E08", codes: "IEC", tags: ["investigative", "enterprising", "conventional"], desc: "\u7814\u7A76\u5E02\u573A\u8D8B\u52BF\uFF0C\u8BC4\u4F30\u6295\u8D44\u673A\u4F1A\u3002" },
    { title: "AI \u7814\u7A76\u5458", codes: "IAS", tags: ["investigative", "artistic", "social"], desc: "\u63A2\u7D22\u4EBA\u5DE5\u667A\u80FD\u524D\u6CBF\uFF0C\u5F00\u53D1\u667A\u80FD\u7CFB\u7EDF\u3002" },
    { title: "\u5185\u5BB9\u521B\u4F5C\u8005", codes: "AES", tags: ["artistic", "enterprising", "social"], desc: "\u901A\u8FC7\u591A\u5A92\u4F53\u5185\u5BB9\u5EFA\u7ACB\u4E2A\u4EBA\u54C1\u724C\u4E0E\u5F71\u54CD\u529B\u3002" },
    { title: "\u975E\u8425\u5229\u7EC4\u7EC7\u8D1F\u8D23\u4EBA", codes: "SAE", tags: ["social", "artistic", "enterprising"], desc: "\u63A8\u52A8\u793E\u4F1A\u516C\u76CA\u4F7F\u547D\uFF0C\u534F\u8C03\u5FD7\u613F\u8005\u4E0E\u8D44\u6E90\u3002" }
  ];

  // js/questions.js
  var QUESTIONS = [...CORE_QUESTIONS, ...EXTENDED_QUESTIONS, ...CAREER_QUESTIONS];
  var TOTAL_QUESTIONS = QUESTIONS.length;

  // js/profiles.js
  var reverseMap = /* @__PURE__ */ new Map();
  QUESTIONS.forEach((q) => reverseMap.set(q.id, !!q.reverse));
  function checkConsistency(answers2) {
    let violations = 0;
    for (const { a, b, maxDiff } of CONSISTENCY_PAIRS) {
      const va = answers2[a];
      const vb = answers2[b];
      if (va == null || vb == null) continue;
      const scoredA = reverseMap.get(a) ? 6 - va : va;
      const scoredB = reverseMap.get(b) ? 6 - vb : vb;
      if (Math.abs(scoredA - scoredB) > maxDiff) violations++;
    }
    const score = Math.max(0, 100 - violations * 18);
    let level, note;
    if (score >= 85) {
      level = "\u9AD8";
      note = "\u4F5C\u7B54\u4E00\u81F4\u6027\u826F\u597D\uFF0C\u7ED3\u679C\u53EF\u4FE1\u5EA6\u8F83\u9AD8\u3002";
    } else if (score >= 65) {
      level = "\u4E2D";
      note = "\u90E8\u5206\u9898\u76EE\u5B58\u5728\u4E0D\u4E00\u81F4\uFF0C\u5EFA\u8BAE\u7ED3\u5408\u6574\u4F53\u8D8B\u52BF\u7406\u89E3\u7ED3\u679C\u3002";
    } else {
      level = "\u4F4E";
      note = "\u4F5C\u7B54\u4E00\u81F4\u6027\u504F\u4F4E\uFF0C\u53EF\u80FD\u53D7\u5F53\u524D\u60C5\u7EEA\u6216\u968F\u673A\u4F5C\u7B54\u5F71\u54CD\uFF0C\u5EFA\u8BAE\u62E9\u65E5\u91CD\u6D4B\u3002";
    }
    return { score, level, note, violations };
  }
  function deriveArchetype(flatScores) {
    const matches = ARCHETYPES.filter((a) => a.match(flatScores));
    if (matches.length === 0) return ARCHETYPE_DEFAULT;
    if (matches.length === 1) return matches[0];
    return matches.reduce((best, m) => {
      const score = (m.match.toString().match(/>=/g) || []).length;
      const bestScore = (best.match.toString().match(/>=/g) || []).length;
      return score > bestScore ? m : best;
    });
  }
  function generateStrengthsWeaknesses(results2) {
    const strengths = [];
    const growth = [];
    const check = (score, highMsg, lowMsg, hi = 65, lo = 35) => {
      if (score >= hi) strengths.push(highMsg);
      else if (score <= lo) growth.push(lowMsg);
    };
    const bf = results2.bigFive;
    check(bf.openness, "\u5F3A\u70C8\u7684\u597D\u5947\u5FC3\u548C\u521B\u9020\u529B", "\u53EF\u4EE5\u5C1D\u8BD5\u66F4\u591A\u65B0\u4F53\u9A8C\u6765\u62D3\u5C55\u89C6\u91CE");
    check(bf.conscientiousness, "\u5353\u8D8A\u7684\u81EA\u5F8B\u548C\u6267\u884C\u529B", "\u5EFA\u7ACB\u8F7B\u91CF\u8BA1\u5212\u6709\u52A9\u4E8E\u5B9E\u73B0\u957F\u671F\u76EE\u6807");
    check(bf.extraversion, "\u51FA\u8272\u7684\u793E\u4EA4\u80FD\u91CF\u548C\u8868\u8FBE\u529B", "\u4FDD\u62A4\u72EC\u5904\u65F6\u95F4\u4EE5\u6062\u590D\u6DF1\u5EA6\u601D\u8003");
    check(bf.agreeableness, "\u5929\u7136\u7684\u5171\u60C5\u529B\u548C\u5408\u4F5C\u7CBE\u795E", "\u5728\u5FC5\u8981\u65F6\u7EC3\u4E60\u66F4\u76F4\u63A5\u5730\u8868\u8FBE\u9700\u6C42");
    check(bf.emotionalStability, "\u5F3A\u5927\u7684\u5FC3\u7406\u97E7\u6027\u548C\u51B7\u9759", "\u5141\u8BB8\u81EA\u5DF1\u548C\u4ED6\u4EBA\u8868\u8FBE\u8106\u5F31");
    check(results2.selfConcept.selfEsteem, "\u5065\u5EB7\u7684\u81EA\u6211\u4EF7\u503C\u611F", "\u7EC3\u4E60\u81EA\u6211\u63A5\u7EB3\uFF0C\u51CF\u5C11\u4E0E\u4ED6\u4EBA\u6BD4\u8F83");
    check(results2.selfConcept.selfEfficacy, "\u5BF9\u8FBE\u6210\u76EE\u6807\u5145\u6EE1\u4FE1\u5FC3", "\u4ECE\u5C0F\u76EE\u6807\u79EF\u7D2F\u6210\u529F\u7ECF\u9A8C");
    check(results2.emotion.reappraisal, "\u6210\u719F\u7684\u60C5\u7EEA\u8C03\u8282\u7B56\u7565", "\u5B66\u4E60\u8BA4\u77E5\u91CD\u6784\u6280\u5DE7\u63D0\u5347\u5FC3\u7406\u5F39\u6027");
    check(results2.motivation.growthMindset, "\u76F8\u4FE1\u80FD\u529B\u53EF\u4EE5\u53D1\u5C55", "\u5C06\u5931\u8D25\u91CD\u65B0\u5B9A\u4E49\u4E3A\u5B66\u4E60\u673A\u4F1A");
    if (results2.emotion.suppression >= 65) {
      growth.push("\u60C5\u7EEA\u8868\u8FBE\u6291\u5236\u8F83\u9AD8\uFF0C\u957F\u671F\u53EF\u80FD\u589E\u52A0\u538B\u529B\uFF0C\u5C1D\u8BD5\u5B89\u5168\u5730\u5206\u4EAB\u611F\u53D7");
    }
    if (results2.hexaco.honestyHumility >= 65) {
      strengths.push("\u771F\u8BDA\u8C26\u900A\uFF0C\u662F\u503C\u5F97\u4FE1\u8D56\u7684\u4EBA");
    }
    return { strengths: strengths.slice(0, 5), growth: growth.slice(0, 5) };
  }
  function generateHolisticSummary(results2, archetype) {
    var _a;
    const topTraits = Object.entries(results2.bigFive).sort(([, a], [, b]) => b - a).slice(0, 2).map(([k]) => {
      var _a2;
      return ((_a2 = TRAIT_META[k]) == null ? void 0 : _a2.name) || k;
    });
    const valueTop = Object.entries(results2.values).sort(([, a], [, b]) => b - a)[0];
    const valueName = ((_a = VALUE_META[valueTop[0]]) == null ? void 0 : _a.name) || "";
    const careerPart = results2.career ? `\u804C\u4E1A\u5174\u8DA3\u4EE3\u7801 ${results2.career.hollandCode}\uFF08${results2.career.primary.name}\uFF09\uFF0C` : "";
    return `\u4F60\u662F\u300C${archetype.name}\u300D\u2014\u2014${archetype.desc} \u4F60\u7684\u5927\u4E94\u4EBA\u683C\u4EE5 ${topTraits.join("\u4E0E")} \u6700\u4E3A\u7A81\u51FA\uFF0C\u6838\u5FC3\u4EF7\u503C\u5BFC\u5411\u4E3A\u300C${valueName}\u300D\u3002${careerPart}\u8BA4\u77E5\u98CE\u683C ${results2.cognitive.code}\uFF0C\u4F9D\u604B\u7C7B\u578B\u4E3A ${results2.attachmentType.name}\u3002`;
  }
  function generateAdvancedInsights(results2) {
    const insights = [];
    const { bigFive: bf, facets } = results2;
    if (facets.intellect >= 65 && facets.aestheticOpenness < 45) {
      insights.push('\u4F60\u7684\u5F00\u653E\u6027\u4E3B\u8981\u4F53\u73B0\u5728\u667A\u529B\u63A2\u7D22\u800C\u975E\u5BA1\u7F8E\u4F53\u9A8C\u2014\u2014\u4F60\u662F"\u601D\u8003\u8005"\u800C\u975E"\u611F\u53D7\u8005"\u578B\u5F00\u653E\u4EBA\u683C\u3002');
    }
    if (facets.industriousness >= 65 && facets.orderliness < 45) {
      insights.push('\u4F60\u52E4\u52C9\u4F46\u4E0D\u592A\u5728\u610F\u79E9\u5E8F\u2014\u2014"\u9AD8\u6548\u6DF7\u4E71\u578B"\u5DE5\u4F5C\u8005\uFF0C\u4EA7\u51FA\u9AD8\u4F46\u73AF\u5883\u53EF\u80FD\u6742\u4E71\u3002');
    }
    if (facets.compassion >= 65 && facets.politeness < 45) {
      insights.push('\u4F60\u5185\u5FC3\u5BCC\u6709\u540C\u60C5\u5FC3\u4F46\u8868\u8FBE\u76F4\u63A5\u2014\u2014"\u6E29\u6696\u7684\u76F4\u7387\u8005"\uFF0C\u5173\u5FC3\u4ED6\u4EBA\u4F46\u4E0D\u56DE\u907F\u51B2\u7A81\u3002');
    }
    const pf = results2.motivation;
    if (pf.promotionFocus >= 60 && pf.preventionFocus >= 60) {
      insights.push('\u4F60\u540C\u65F6\u88AB"\u83B7\u5F97"\u548C"\u907F\u514D\u635F\u5931"\u9A71\u52A8\u2014\u2014\u51B3\u7B56\u4E2D\u65E2\u79EF\u6781\u53C8\u8C28\u614E\u3002');
    } else if (pf.promotionFocus >= 65) {
      insights.push("\u4FC3\u8FDB\u578B\u52A8\u673A\u4E3B\u5BFC\u2014\u2014\u4F60\u66F4\u9002\u5408\u9700\u8981\u521B\u65B0\u3001\u7A81\u7834\u548C\u5411\u4E0A\u6311\u6218\u7684\u73AF\u5883\u3002");
    } else if (pf.preventionFocus >= 65) {
      insights.push("\u9884\u9632\u578B\u52A8\u673A\u4E3B\u5BFC\u2014\u2014\u4F60\u66F4\u9002\u5408\u9700\u8981\u7CBE\u786E\u3001\u5408\u89C4\u548C\u98CE\u9669\u7BA1\u63A7\u7684\u89D2\u8272\u3002");
    }
    if (results2.values.achievement >= 65 && bf.conscientiousness >= 60) {
      insights.push("\u6210\u5C31\u4EF7\u503C\u89C2\u4E0E\u5C3D\u8D23\u6027\u9AD8\u5EA6\u4E00\u81F4\u2014\u2014\u4F60\u6709\u6E05\u6670\u7684\u6210\u5C31\u8DEF\u5F84\u548C\u5B9E\u73B0\u80FD\u529B\u3002");
    }
    if (results2.values.benevolence >= 65 && bf.agreeableness >= 60) {
      insights.push("\u4EC1\u6148\u4EF7\u503C\u89C2\u4E0E\u4EBA\u683C\u9AD8\u5EA6\u5951\u5408\u2014\u2014\u5E2E\u52A9\u4ED6\u4EBA\u7684\u52A8\u673A\u771F\u5B9E\u4E14\u6301\u4E45\u3002");
    }
    if (results2.selfConcept.selfEsteem <= 40 && results2.selfConcept.selfEfficacy >= 60) {
      insights.push("\u81EA\u6211\u6548\u80FD\u9AD8\u4F46\u81EA\u5C0A\u504F\u4F4E\u2014\u2014\u4F60\u76F8\u4FE1\u81EA\u5DF1\u80FD\u505A\u4E8B\uFF0C\u4F46\u53EF\u80FD\u4E0D\u591F\u8BA4\u53EF\u81EA\u8EAB\u4EF7\u503C\u3002");
    }
    if (results2.emotion.reappraisal >= 60 && results2.emotion.suppression >= 60) {
      insights.push("\u4F60\u65E2\u5584\u4E8E\u5185\u5FC3\u8C03\u8282\u53C8\u6291\u5236\u5916\u5728\u8868\u8FBE\u2014\u2014\u5185\u5728\u5F39\u6027\u5F3A\u4F46\u4ED6\u4EBA\u53EF\u80FD\u96BE\u4EE5\u8BFB\u61C2\u4F60\u3002");
    }
    const ip = results2.interpersonal;
    if (ip.collaborating >= 60 && ip.asserting >= 60) {
      insights.push('\u4F60\u5728\u51B2\u7A81\u4E2D\u65E2\u80FD\u5408\u4F5C\u53C8\u80FD\u575A\u6301\u2014\u2014"\u7075\u6D3B\u6218\u7565\u5BB6"\u578B\u7684\u51B2\u7A81\u5904\u7406\u8005\u3002');
    } else if (ip.avoiding >= 60) {
      insights.push("\u4F60\u503E\u5411\u56DE\u907F\u51B2\u7A81\u2014\u2014\u77ED\u671F\u7EF4\u62A4\u548C\u8C10\uFF0C\u4F46\u957F\u671F\u53EF\u80FD\u79EF\u7D2F\u672A\u8868\u8FBE\u7684\u9700\u6C42\u3002");
    }
    insights.push(`\u8BA4\u77E5\u98CE\u683C ${results2.cognitive.code} \u662F\u884C\u4E3A\u503E\u5411\u4F30\u8BA1\uFF0C\u975E\u56FA\u5B9A\u6807\u7B7E\u3002\u4EBA\u5728\u4E0D\u540C\u60C5\u5883\u4E0B\u53EF\u4EE5\u7075\u6D3B\u8C03\u7528\u4E0D\u540C\u6A21\u5F0F\u3002`);
    return insights.slice(0, 8);
  }
  function interpretFacet(key, score) {
    const meta = FACET_META[key];
    if (!meta) return "";
    if (score >= 65) return meta.highDesc;
    if (score <= 35) return meta.lowDesc;
    return `\u6B64\u5B50\u9762\u5904\u4E8E\u4E2D\u95F4\u6C34\u5E73\uFF08${score}\u5206\uFF09\uFF0C\u5728\u76F8\u5173\u60C5\u5883\u4E2D\u53EF\u80FD\u5C55\u73B0\u4E0D\u540C\u4FA7\u9762\u3002`;
  }
  function interpretValue(key, score) {
    const meta = VALUE_META[key];
    if (!meta) return "";
    if (score >= 65) return `\u300C${meta.name}\u300D\u662F\u4F60\u7684\u6838\u5FC3\u4EF7\u503C\u9A71\u52A8\u2014\u2014${meta.desc}\u3002`;
    if (score <= 35) return `\u300C${meta.name}\u300D\u5BF9\u4F60\u7684\u9A71\u52A8\u529B\u8F83\u5F31\u3002`;
    return `\u300C${meta.name}\u300D\u5BF9\u4F60\u6709\u4E00\u5B9A\u91CD\u8981\u6027\uFF08${score}\u5206\uFF09\u3002`;
  }

  // js/career.js
  var RIASEC_KEYS = ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];
  function deriveRiasecFromPersonality(results2) {
    const { bigFive: bf, facets, values, motivation } = results2;
    return {
      realistic: clamp(bf.conscientiousness * 0.3 + (100 - bf.openness) * 0.3 + facets.orderliness * 0.2 + values.security * 0.2),
      investigative: clamp(bf.openness * 0.35 + facets.intellect * 0.35 + (100 - bf.extraversion) * 0.15 + motivation.internalLocus * 0.15),
      artistic: clamp(bf.openness * 0.35 + facets.aestheticOpenness * 0.35 + values.selfDirection * 0.2 + values.stimulation * 0.1),
      social: clamp(bf.agreeableness * 0.3 + facets.compassion * 0.3 + bf.extraversion * 0.2 + values.benevolence * 0.2),
      enterprising: clamp(bf.extraversion * 0.25 + facets.assertiveness * 0.25 + values.achievement * 0.25 + values.power * 0.15 + motivation.promotionFocus * 0.1),
      conventional: clamp(bf.conscientiousness * 0.3 + facets.orderliness * 0.3 + motivation.preventionFocus * 0.2 + values.security * 0.2)
    };
  }
  function scoreRiasec(directScores, personalityResults) {
    const derived = deriveRiasecFromPersonality(personalityResults);
    const blended = {};
    for (const key of RIASEC_KEYS) {
      blended[key] = Math.round(directScores[key] * 0.75 + derived[key] * 0.25);
    }
    const sorted = RIASEC_KEYS.map((key) => ({ key, score: blended[key], ...RIASEC_META[key] })).sort((a, b) => b.score - a.score);
    const hollandCode = sorted.slice(0, 3).map((t) => t.code).join("");
    const primary = sorted[0];
    const secondary = sorted[1];
    return {
      scores: blended,
      sorted,
      hollandCode,
      primary,
      secondary,
      recommendations: matchCareers(blended, hollandCode, personalityResults),
      workEnvironment: describeWorkEnvironment(sorted),
      careerInsights: generateCareerInsights(blended, sorted, personalityResults)
    };
  }
  function matchCareers(scores, hollandCode, results2) {
    const codeLetters = hollandCode.split("");
    const topKeys = RIASEC_KEYS.filter((k) => scores[k] >= 50).sort((a, b) => scores[b] - scores[a]);
    const scored = CAREER_DATABASE.map((career) => {
      let fit = 0;
      const careerCodes = career.codes.split("");
      careerCodes.forEach((letter, i) => {
        const key = letterToKey(letter);
        if (key) fit += scores[key] * (3 - i) * 0.15;
      });
      career.tags.forEach((tag) => {
        fit += scores[tag] * 0.25;
      });
      codeLetters.forEach((letter, i) => {
        if (careerCodes.includes(letter)) fit += (3 - i) * 8;
      });
      if (results2.bigFive.conscientiousness >= 65 && career.tags.includes("conventional")) fit += 5;
      if (results2.bigFive.openness >= 65 && career.tags.includes("investigative")) fit += 5;
      if (results2.bigFive.agreeableness >= 65 && career.tags.includes("social")) fit += 5;
      return { ...career, fit: Math.round(fit) };
    });
    return scored.sort((a, b) => b.fit - a.fit).slice(0, 8);
  }
  function describeWorkEnvironment(sorted) {
    const top = sorted.slice(0, 2);
    return {
      ideal: top.map((t) => t.env).join("\uFF1B"),
      avoid: getAvoidEnvironments(sorted),
      summary: `\u6700\u9002\u5408 ${top[0].name}\uFF08${top[0].code}\uFF09\u4E0E ${top[1].name}\uFF08${top[1].code}\uFF09\u4EA4\u53C9\u7684\u73AF\u5883\u2014\u2014${top[0].env}\u3002`
    };
  }
  function getAvoidEnvironments(sorted) {
    const bottom = sorted[sorted.length - 1];
    const avoidMap = {
      realistic: "\u7EAF\u529E\u516C\u5BA4\u6587\u6848\u3001\u957F\u671F\u8131\u79BB\u5B9E\u64CD",
      investigative: "\u9AD8\u5EA6\u91CD\u590D\u3001\u65E0\u9700\u601D\u8003\u7684\u6D41\u6C34\u7EBF\u5DE5\u4F5C",
      artistic: "\u4E25\u683C\u50F5\u5316\u3001\u65E0\u521B\u610F\u7A7A\u95F4\u7684\u6D41\u7A0B\u5C97\u4F4D",
      social: "\u957F\u671F\u5B64\u7ACB\u3001\u7F3A\u5C11\u4EBA\u9645\u4E92\u52A8\u7684\u5C97\u4F4D",
      enterprising: "\u65E0\u51B3\u7B56\u6743\u3001\u7EAF\u6267\u884C\u7684\u540E\u53F0\u5C97\u4F4D",
      conventional: "\u9AD8\u5EA6\u4E0D\u786E\u5B9A\u3001\u65E0\u89C4\u5219\u53EF\u5FAA\u7684\u521B\u4E1A\u65E9\u671F"
    };
    return avoidMap[bottom.key] || "\u4E0E\u6838\u5FC3\u5174\u8DA3\u5B8C\u5168\u4E0D\u7B26\u7684\u73AF\u5883";
  }
  function generateCareerInsights(scores, sorted, results2) {
    const insights = [];
    const [p, s] = sorted;
    insights.push(`\u4F60\u7684 Holland \u4EE3\u7801\u4E3A ${sorted.slice(0, 3).map((t) => t.code).join("")}\uFF0C\u6838\u5FC3\u5174\u8DA3\u7C7B\u578B\u662F\u300C${p.name}\u300D\uFF0C\u6B21\u8981\u7C7B\u578B\u662F\u300C${s.name}\u300D\u3002`);
    const adjacent = areAdjacent(p.key, s.key);
    if (adjacent) {
      insights.push(`${p.name}\u4E0E${s.name}\u5728 Holland \u516D\u8FB9\u5F62\u4E0A\u76F8\u90BB\uFF0C\u662F\u5E38\u89C1\u4E14\u7A33\u5B9A\u7684\u5174\u8DA3\u7EC4\u5408\uFF0C\u804C\u4E1A\u9009\u62E9\u9762\u8F83\u5E7F\u3002`);
    } else {
      insights.push(`${p.name}\u4E0E${s.name}\u5728 Holland \u516D\u8FB9\u5F62\u4E0A\u76F8\u5BF9\uFF0C\u4EE3\u8868\u4F60\u517C\u5177\u4E24\u79CD\u4E0D\u540C\u53D6\u5411\u2014\u2014\u9002\u5408\u8DE8\u754C\u6216\u590D\u5408\u578B\u5C97\u4F4D\u3002`);
    }
    if (results2.bigFive.conscientiousness >= 65 && p.key === "artistic") {
      insights.push("\u4F60\u7684\u9AD8\u5C3D\u8D23\u6027\u4E0E\u827A\u672F\u578B\u5174\u8DA3\u7ED3\u5408\u2014\u2014\u300C\u7ED3\u6784\u5316\u521B\u610F\u8005\u300D\uFF0C\u9002\u5408\u8BBE\u8BA1\u7BA1\u7406\u3001\u5EFA\u7B51\u7B49\u9700\u521B\u610F+\u6267\u884C\u529B\u7684\u9886\u57DF\u3002");
    }
    if (results2.bigFive.extraversion >= 65 && p.key === "investigative") {
      insights.push("\u5916\u5411 + \u7814\u7A76\u578B\u7EC4\u5408\u2014\u2014\u9002\u5408\u9700\u8981\u5927\u91CF\u6C9F\u901A\u7684\u7814\u7A76\u5C97\u4F4D\uFF0C\u5982\u7528\u6237\u7814\u7A76\u3001\u79D1\u5B66\u4F20\u64AD\u3001\u54A8\u8BE2\u5206\u6790\u3002");
    }
    if (results2.values.achievement >= 65 && scores.enterprising >= 60) {
      insights.push("\u6210\u5C31\u4EF7\u503C\u89C2\u4E0E\u4F01\u4E1A\u578B\u5174\u8DA3\u4E00\u81F4\u2014\u2014\u5546\u4E1A\u3001\u7BA1\u7406\u3001\u521B\u4E1A\u8DEF\u5F84\u4E0E\u5185\u5728\u52A8\u673A\u9AD8\u5EA6\u5951\u5408\u3002");
    }
    if (results2.selfConcept.selfEfficacy >= 65) {
      insights.push("\u8F83\u9AD8\u7684\u81EA\u6211\u6548\u80FD\u611F\u652F\u6301\u4F60\u5728\u5174\u8DA3\u65B9\u5411\u4E0A\u4E3B\u52A8\u5C1D\u8BD5\u548C\u8F6C\u578B\uFF0C\u5EFA\u8BAE\u4ECE\u5C0F\u9879\u76EE\u6216\u526F\u4E1A\u5F00\u59CB\u9A8C\u8BC1\u3002");
    }
    const spread = sorted[0].score - sorted[sorted.length - 1].score;
    if (spread < 20) {
      insights.push("\u516D\u9879\u5174\u8DA3\u5F97\u5206\u8F83\u4E3A\u5747\u8861\u2014\u2014\u4F60\u662F\u300C\u5168\u80FD\u578B\u300D\u9009\u624B\uFF0C\u53EF\u901A\u8FC7\u4EF7\u503C\u89C2\u548C\u4EBA\u683C\u7279\u8D28\u8FDB\u4E00\u6B65\u7F29\u5C0F\u65B9\u5411\u3002");
    }
    return insights.slice(0, 5);
  }
  function areAdjacent(a, b) {
    const order = RIASEC_KEYS;
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    const diff = Math.abs(ia - ib);
    return diff === 1 || diff === 5;
  }
  function letterToKey(letter) {
    const map = { R: "realistic", I: "investigative", A: "artistic", S: "social", E: "enterprising", C: "conventional" };
    return map[letter];
  }
  function clamp(v) {
    return Math.max(0, Math.min(100, Math.round(v)));
  }
  function formatCareerReport(career) {
    const lines = [];
    lines.push("\u3010\u804C\u4E1A\u5174\u8DA3 RIASEC\u3011");
    lines.push(`  Holland \u4EE3\u7801: ${career.hollandCode}`);
    career.sorted.forEach((t) => lines.push(`  ${t.name} (${t.code}): ${t.score}%`));
    lines.push("");
    lines.push("\u3010\u63A8\u8350\u804C\u4E1A\u3011");
    career.recommendations.forEach((c, i) => lines.push(`  ${i + 1}. ${c.title}\uFF08${c.codes}\uFF09\u2014 \u5339\u914D\u5EA6 ${c.fit} \u2014 ${c.desc}`));
    lines.push("");
    lines.push("\u3010\u7406\u60F3\u5DE5\u4F5C\u73AF\u5883\u3011");
    lines.push(`  ${career.workEnvironment.summary}`);
    lines.push(`  \u5EFA\u8BAE\u907F\u514D: ${career.workEnvironment.avoid}`);
    lines.push("");
    lines.push("\u3010\u804C\u4E1A\u6D1E\u5BDF\u3011");
    career.careerInsights.forEach((ins, i) => lines.push(`  ${i + 1}. ${ins}`));
    return lines.join("\n");
  }

  // js/scoring.js
  var avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 3;
  var toPercent = (mean) => Math.round((mean - 1) / 4 * 100);
  function scoreAssessment(answers2) {
    var _a;
    const scales = {};
    for (const q of QUESTIONS) {
      const raw = answers2[q.id];
      if (raw == null) continue;
      const scored = q.reverse ? 6 - raw : raw;
      if (!scales[q.scale]) scales[q.scale] = [];
      scales[q.scale].push(scored);
    }
    const pct = (key) => toPercent(avg(scales[key] || []));
    const neuroticismPct = pct("neuroticism");
    const bigFive = {
      extraversion: pct("extraversion"),
      agreeableness: pct("agreeableness"),
      conscientiousness: pct("conscientiousness"),
      emotionalStability: ((_a = scales.neuroticism) == null ? void 0 : _a.length) ? 100 - neuroticismPct : pct("emotionalStability") || 50,
      openness: pct("openness")
    };
    const facets = {
      intellect: pct("intellect"),
      aestheticOpenness: pct("aestheticOpenness"),
      industriousness: pct("industriousness"),
      orderliness: pct("orderliness"),
      enthusiasm: pct("enthusiasm"),
      assertiveness: pct("assertiveness"),
      compassion: pct("compassion"),
      politeness: pct("politeness"),
      volatility: pct("volatility"),
      withdrawal: pct("withdrawal")
    };
    const hexaco = { honestyHumility: pct("honestyHumility") };
    const attachment = {
      anxiety: pct("attachmentAnxiety"),
      avoidance: pct("attachmentAvoidance")
    };
    const selfConcept = {
      selfEsteem: pct("selfEsteem"),
      selfEfficacy: pct("selfEfficacy")
    };
    const emotion = {
      reappraisal: pct("reappraisal"),
      suppression: pct("suppression"),
      emotionalAwareness: pct("emotionalAwareness"),
      emotionManagement: pct("emotionManagement")
    };
    const values = {
      selfDirection: pct("selfDirection"),
      benevolence: pct("benevolence"),
      achievement: pct("achievement"),
      security: pct("security"),
      tradition: pct("tradition"),
      stimulation: pct("stimulation"),
      universalism: pct("universalism"),
      power: pct("power")
    };
    const motivation = {
      promotionFocus: pct("promotionFocus"),
      preventionFocus: pct("preventionFocus"),
      internalLocus: pct("internalLocus"),
      growthMindset: pct("growthMindset")
    };
    const interpersonal = {
      collaborating: pct("conflictCollaborating"),
      asserting: pct("conflictAsserting"),
      avoiding: pct("conflictAvoiding")
    };
    const riasecDirect = {
      realistic: pct("realistic"),
      investigative: pct("investigative"),
      artistic: pct("artistic"),
      social: pct("social"),
      enterprising: pct("enterprising"),
      conventional: pct("conventional")
    };
    const cognitive = deriveCognitiveStyle(bigFive, scales);
    const attachmentType = classifyAttachment(attachment.anxiety, attachment.avoidance);
    const consistency = checkConsistency(answers2);
    const flatScores = {
      ...bigFive,
      ...facets,
      ...hexaco,
      ...values,
      ...motivation,
      ...selfConcept,
      thinkingStyle: cognitive.T,
      promotionFocus: motivation.promotionFocus,
      preventionFocus: motivation.preventionFocus,
      internalLocus: motivation.internalLocus,
      growthMindset: motivation.growthMindset,
      honestyHumility: hexaco.honestyHumility,
      reappraisal: emotion.reappraisal
    };
    const archetype = deriveArchetype(flatScores);
    const strengthsWeaknesses = generateStrengthsWeaknesses({ bigFive, hexaco, selfConcept, emotion, motivation, interpersonal });
    const personalityBundle = { bigFive, facets, values, motivation, selfConcept, hexaco, emotion, interpersonal, cognitive };
    const career = scoreRiasec(riasecDirect, personalityBundle);
    const summary = generateHolisticSummary({ bigFive, values, cognitive, attachmentType, career }, archetype);
    const insights = generateAdvancedInsights({ bigFive, facets, values, motivation, selfConcept, emotion, interpersonal, cognitive, hexaco });
    return {
      bigFive,
      facets,
      hexaco,
      attachment,
      attachmentType,
      selfConcept,
      emotion,
      values,
      motivation,
      interpersonal,
      riasec: riasecDirect,
      career,
      cognitive,
      consistency,
      archetype,
      strengthsWeaknesses,
      summary,
      insights
    };
  }
  function deriveCognitiveStyle(bigFive, scales) {
    const tfItems = scales.thinkingFeeling || [];
    const snItems = scales.sensingIntuition || [];
    const jpItems = scales.judgingPerceiving || [];
    const E = bigFive.extraversion;
    const N = Math.round(toPercent(avg(snItems)) * 0.6 + bigFive.openness * 0.4);
    const T = Math.round(toPercent(avg(tfItems)) * 0.5 + (100 - bigFive.agreeableness) * 0.5);
    const J = Math.round(toPercent(avg(jpItems)) * 0.5 + bigFive.conscientiousness * 0.5);
    const pick = (v, a, b) => v >= 50 ? a : b;
    return {
      E,
      I: 100 - E,
      S: 100 - N,
      N,
      T,
      F: 100 - T,
      J,
      P: 100 - J,
      code: [pick(E, "E", "I"), pick(N, "N", "S"), pick(T, "T", "F"), pick(J, "J", "P")].join(""),
      dimensions: {
        "E/I": { left: "\u5185\u5411 I", right: "\u5916\u5411 E", value: E },
        "S/N": { left: "\u5B9E\u611F S", right: "\u76F4\u89C9 N", value: N },
        "T/F": { left: "\u60C5\u611F F", right: "\u601D\u7EF4 T", value: T },
        "J/P": { left: "\u611F\u77E5 P", right: "\u5224\u65AD J", value: J }
      }
    };
  }
  function classifyAttachment(anxiety, avoidance) {
    const high = (v) => v >= 55;
    const low = (v) => v < 45;
    if (low(anxiety) && low(avoidance)) return ATTACHMENT_TYPES.secure;
    if (high(anxiety) && low(avoidance)) return ATTACHMENT_TYPES.anxious;
    if (low(anxiety) && high(avoidance)) return ATTACHMENT_TYPES.avoidant;
    return ATTACHMENT_TYPES.fearful;
  }
  function interpretTrait(key, score) {
    const meta = TRAIT_META[key];
    if (!meta) return "";
    if (score >= 65) return meta.highDesc;
    if (score <= 35) return meta.lowDesc;
    return `\u4F60\u7684${meta.name}\u5904\u4E8E\u4E2D\u95F4\u6C34\u5E73\uFF08${score}\u5206\uFF09\uFF0C\u5728\u4E0D\u540C\u60C5\u5883\u4E2D\u53EF\u80FD\u5C55\u73B0${meta.low}\u548C${meta.high}\u4E24\u9762\u7684\u7279\u5F81\u3002`;
  }
  function buildRadarPoints(scores, keys, cx, cy, r) {
    const n = keys.length;
    return keys.map((key, i) => {
      var _a;
      const angle = Math.PI * 2 * i / n - Math.PI / 2;
      const value = ((_a = scores[key]) != null ? _a : 50) / 100;
      return `${cx + Math.cos(angle) * r * value},${cy + Math.sin(angle) * r * value}`;
    }).join(" ");
  }
  function buildRadarAxes(keys, cx, cy, r) {
    const n = keys.length;
    return keys.map((key, i) => {
      var _a;
      const angle = Math.PI * 2 * i / n - Math.PI / 2;
      const lx = cx + Math.cos(angle) * (r + 22);
      const ly = cy + Math.sin(angle) * (r + 22);
      return {
        key,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        lx,
        ly,
        label: ((_a = TRAIT_META[key]) == null ? void 0 : _a.name) || key
      };
    });
  }
  function generateReportText(r) {
    const lines = ["\u771F\u6211\u6D1E\u5BDF \xB7 \u5168\u9762\u4EBA\u683C\u8BC4\u4F30\u62A5\u544A", "=".repeat(44), ""];
    lines.push(`\u3010\u4EBA\u683C\u539F\u578B\u3011${r.archetype.name}`);
    lines.push(r.archetype.desc);
    lines.push("");
    lines.push(`\u3010\u4F5C\u7B54\u4E00\u81F4\u6027\u3011${r.consistency.score}\u5206 (${r.consistency.level}) \u2014 ${r.consistency.note}`);
    lines.push("");
    lines.push("\u3010\u5927\u4E94\u4EBA\u683C\u3011");
    Object.entries(r.bigFive).forEach(([k, v]) => {
      var _a;
      return lines.push(`  ${((_a = TRAIT_META[k]) == null ? void 0 : _a.name) || k}: ${v}%`);
    });
    lines.push("");
    lines.push("\u3010\u4EBA\u683C\u9762 BFAS\u3011");
    Object.entries(r.facets).forEach(([k, v]) => lines.push(`  ${k}: ${v}%`));
    lines.push("");
    lines.push(`\u3010HEXACO\u3011\u8BDA\u5B9E-\u8C26\u900A: ${r.hexaco.honestyHumility}%`);
    lines.push("");
    lines.push("\u3010\u4F9D\u604B\u98CE\u683C\u3011");
    lines.push(`  \u7126\u8651: ${r.attachment.anxiety}%  \u56DE\u907F: ${r.attachment.avoidance}%`);
    lines.push(`  \u7C7B\u578B: ${r.attachmentType.name}`);
    lines.push("");
    lines.push("\u3010\u81EA\u6211\u6982\u5FF5\u3011");
    lines.push(`  \u81EA\u5C0A: ${r.selfConcept.selfEsteem}%  \u81EA\u6211\u6548\u80FD: ${r.selfConcept.selfEfficacy}%`);
    lines.push("");
    lines.push("\u3010\u60C5\u7EEA\u80FD\u529B\u3011");
    Object.entries(r.emotion).forEach(([k, v]) => {
      var _a;
      return lines.push(`  ${((_a = TRAIT_META[k]) == null ? void 0 : _a.name) || k}: ${v}%`);
    });
    lines.push("");
    lines.push("\u3010\u6838\u5FC3\u4EF7\u503C\u3011");
    Object.entries(r.values).forEach(([k, v]) => lines.push(`  ${k}: ${v}%`));
    lines.push("");
    lines.push("\u3010\u52A8\u673A\u53D6\u5411\u3011");
    Object.entries(r.motivation).forEach(([k, v]) => {
      var _a;
      return lines.push(`  ${((_a = TRAIT_META[k]) == null ? void 0 : _a.name) || k}: ${v}%`);
    });
    lines.push("");
    lines.push("\u3010\u4EBA\u9645\u98CE\u683C\u3011");
    lines.push(`  \u5408\u4F5C: ${r.interpersonal.collaborating}%  \u7ADE\u4E89: ${r.interpersonal.asserting}%  \u56DE\u907F: ${r.interpersonal.avoiding}%`);
    lines.push("");
    lines.push(`\u3010\u8BA4\u77E5\u98CE\u683C\u3011${r.cognitive.code}`);
    lines.push("");
    lines.push(formatCareerReport(r.career));
    lines.push("");
    lines.push("\u3010\u6838\u5FC3\u4F18\u52BF\u3011");
    r.strengthsWeaknesses.strengths.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
    lines.push("");
    lines.push("\u3010\u6210\u957F\u65B9\u5411\u3011");
    r.strengthsWeaknesses.growth.forEach((g, i) => lines.push(`  ${i + 1}. ${g}`));
    lines.push("");
    lines.push("\u3010\u6DF1\u5EA6\u6D1E\u5BDF\u3011");
    r.insights.forEach((ins, i) => lines.push(`  ${i + 1}. ${ins}`));
    lines.push("");
    lines.push("\u2014\u2014 \u672C\u62A5\u544A\u4EC5\u4F9B\u81EA\u6211\u63A2\u7D22\u53C2\u8003\uFF0C\u4E0D\u80FD\u66FF\u4EE3\u4E13\u4E1A\u5FC3\u7406\u8BC4\u4F30\u3002");
    return lines.join("\n");
  }

  // js/app.js
  var STORAGE_KEY = "personality-insight-v4";
  var ASSESSMENT_MODES = {
    quick: {
      label: "50 \u9898\u5FEB\u901F\u7248",
      reportName: "\u5FEB\u901F\u62A5\u544A",
      questions: QUESTIONS.filter((q) => q.section === "bigfive")
    },
    full: {
      label: "188 \u9898\u8BE6\u7EC6\u7248",
      reportName: "\u5B8C\u6574\u62A5\u544A",
      questions: QUESTIONS
    }
  };
  var assessmentMode = "full";
  var selectedQuestions = ASSESSMENT_MODES.full.questions;
  var currentIndex = 0;
  var answers = {};
  var lastSection = null;
  var latestResult = null;
  var $ = (sel) => document.querySelector(sel);
  var landing = $("#landing");
  var assessment = $("#assessment");
  var results = $("#results");
  function showView(view) {
    [landing, assessment, results].forEach((v) => v.classList.remove("active"));
    view.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function setAssessmentMode(mode) {
    assessmentMode = ASSESSMENT_MODES[mode] ? mode : "full";
    selectedQuestions = ASSESSMENT_MODES[assessmentMode].questions;
  }
  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex, assessmentMode }));
    } catch (e) {
    }
  }
  function loadProgress() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if ((data == null ? void 0 : data.answers) && Object.keys(data.answers).length > 0) {
        setAssessmentMode(data.assessmentMode || "full");
        answers = Object.fromEntries(Object.entries(data.answers).filter(([id]) => selectedQuestions.some((q) => q.id === id)));
        currentIndex = Math.min(data.currentIndex || 0, selectedQuestions.length - 1);
        return true;
      }
    } catch (e) {
    }
    return false;
  }
  function clearProgress() {
    answers = {};
    currentIndex = 0;
    lastSection = null;
    latestResult = null;
    setAssessmentMode("full");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
    }
  }
  function getSectionProgress() {
    var _a;
    const sectionIds = [...new Set(selectedQuestions.map((q) => q.section))];
    const current = (_a = selectedQuestions[currentIndex]) == null ? void 0 : _a.section;
    const idx = sectionIds.indexOf(current);
    return { current: idx + 1, total: sectionIds.length, id: current };
  }
  function renderQuestion() {
    const q = selectedQuestions[currentIndex];
    const container = $("#question-container");
    const section = SECTIONS[q.section];
    const secProg = getSectionProgress();
    $("#progress-fill").style.width = `${(currentIndex + 1) / selectedQuestions.length * 100}%`;
    $("#progress-text").textContent = `${currentIndex + 1} / ${selectedQuestions.length}`;
    $("#section-label").textContent = `${ASSESSMENT_MODES[assessmentMode].label} \xB7 ${section.label} (${secProg.current}/${secProg.total})`;
    $(".progress-bar").setAttribute("aria-valuenow", String(Math.round((currentIndex + 1) / selectedQuestions.length * 100)));
    const showTransition = lastSection && lastSection !== q.section;
    lastSection = q.section;
    container.innerHTML = `
    ${showTransition ? `
      <div class="section-transition">
        <span class="section-transition-tag">\u8FDB\u5165\u65B0\u6A21\u5757</span>
        <h3>${section.label}</h3>
        <p>${section.desc}</p>
      </div>
    ` : ""}
    <p class="question-number">\u7B2C ${currentIndex + 1} \u9898 \xB7 ${section.label}</p>
    <p class="question-text">${q.text}</p>
    <div class="likert-scale">
      <div class="likert-labels">
        <span>${LIKERT_LABELS[0]}</span>
        <span>${LIKERT_LABELS[4]}</span>
      </div>
      <div class="likert-options" role="radiogroup" aria-label="\u8BF7\u9009\u62E9\u7B26\u5408\u7A0B\u5EA6">
        ${[1, 2, 3, 4, 5].map((val) => `
          <label class="likert-option">
            <input type="radio" name="answer" value="${val}" ${answers[q.id] === val ? "checked" : ""} aria-label="${LIKERT_LABELS[val - 1]}" />
            <span>${val}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;
    container.querySelectorAll('input[name="answer"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        answers[q.id] = Number(e.target.value);
        saveProgress();
        $("#next-btn").disabled = false;
      });
    });
    $("#prev-btn").disabled = currentIndex === 0;
    const isLast = currentIndex === selectedQuestions.length - 1;
    $("#next-btn").textContent = isLast ? "\u67E5\u770B\u5B8C\u6574\u62A5\u544A" : "\u4E0B\u4E00\u9898";
    $("#next-btn").disabled = answers[q.id] === void 0;
  }
  function renderResults() {
    const data = scoreAssessment(answers);
    latestResult = data;
    $("#profile-title").textContent = data.archetype.name;
    $("#profile-summary").textContent = data.summary;
    const content = $("#results-content");
    content.innerHTML = "";
    content.appendChild(createArchetypeSection(data));
    content.appendChild(createBigFiveSection(data.bigFive));
    if (assessmentMode === "quick") {
      content.appendChild(createQuickVersionNote());
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
      }
      return;
    }
    content.appendChild(createConsistencySection(data.consistency));
    content.appendChild(createFacetsSection(data.facets));
    content.appendChild(createTraitSection("HEXACO \xB7 \u8BDA\u5B9E-\u8C26\u900A", "\u8865\u5145\u5927\u4E94\u4E4B\u5916\u7684\u5173\u952E\u9053\u5FB7\u4EBA\u683C\u7EF4\u5EA6\u3002", [{ key: "honestyHumility", score: data.hexaco.honestyHumility }]));
    content.appendChild(createAttachmentSection(data));
    content.appendChild(createTraitSection("\u81EA\u6211\u6982\u5FF5", "Rosenberg \u81EA\u5C0A\u91CF\u8868 + \u4E00\u822C\u81EA\u6211\u6548\u80FD\u91CF\u8868\u3002", [
      { key: "selfEsteem", score: data.selfConcept.selfEsteem },
      { key: "selfEfficacy", score: data.selfConcept.selfEfficacy }
    ]));
    content.appendChild(createTraitSection("\u60C5\u7EEA\u80FD\u529B", "\u60C5\u7EEA\u8C03\u8282\u95EE\u5377 (ERQ) + \u60C5\u7EEA\u667A\u529B\u81EA\u9648\u3002", [
      { key: "reappraisal", score: data.emotion.reappraisal },
      { key: "suppression", score: data.emotion.suppression },
      { key: "emotionalAwareness", score: data.emotion.emotionalAwareness },
      { key: "emotionManagement", score: data.emotion.emotionManagement }
    ]));
    content.appendChild(createValuesSection(data.values));
    content.appendChild(createTraitSection("\u52A8\u673A\u53D6\u5411", "\u8C03\u8282\u7126\u70B9\u7406\u8BBA + \u63A7\u5236\u70B9 + \u6210\u957F\u601D\u7EF4\u3002", [
      { key: "promotionFocus", score: data.motivation.promotionFocus },
      { key: "preventionFocus", score: data.motivation.preventionFocus },
      { key: "internalLocus", score: data.motivation.internalLocus },
      { key: "growthMindset", score: data.motivation.growthMindset }
    ]));
    content.appendChild(createInterpersonalSection(data.interpersonal));
    content.appendChild(createCareerSection(data.career));
    content.appendChild(createCognitiveSection(data.cognitive));
    content.appendChild(createStrengthsSection(data.strengthsWeaknesses));
    content.appendChild(createInsightsSection(data.insights));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
    }
  }
  function createArchetypeSection(data) {
    const el = document.createElement("div");
    el.className = "result-section archetype-section";
    el.innerHTML = `
    <p class="eyebrow">Personality Archetype</p>
    <h2 class="archetype-name">${data.archetype.name}</h2>
    <p class="archetype-desc">${data.archetype.desc}</p>
    <div class="type-badge">${data.cognitive.code}</div>
  `;
    return el;
  }
  function createQuickVersionNote() {
    const section = document.createElement("div");
    section.className = "result-section quick-note-section";
    section.innerHTML = `
    <h2>\u5FEB\u901F\u7248\u62A5\u544A\u8BF4\u660E</h2>
    <p class="section-desc">\u672C\u62A5\u544A\u57FA\u4E8E 50 \u9053\u5927\u4E94\u4EBA\u683C\u9898\u751F\u6210\uFF0C\u9002\u5408\u5FEB\u901F\u4E86\u89E3\u6838\u5FC3\u4EBA\u683C\u503E\u5411\u3002</p>
    <ul class="insights-list">
      <li>\u5982\u679C\u4F60\u5E0C\u671B\u7EE7\u7EED\u4E86\u89E3\u4F9D\u604B\u98CE\u683C\u3001\u60C5\u7EEA\u80FD\u529B\u3001\u4EF7\u503C\u89C2\u3001\u52A8\u673A\u53D6\u5411\u4E0E\u804C\u4E1A\u5174\u8DA3\uFF0C\u8BF7\u8FD4\u56DE\u9996\u9875\u9009\u62E9 188 \u9898\u8BE6\u7EC6\u7248\u3002</li>
      <li>\u5FEB\u901F\u7248\u4E0D\u4F1A\u5C55\u793A\u672A\u4F5C\u7B54\u91CF\u8868\u7684\u5206\u6570\uFF0C\u907F\u514D\u628A\u9ED8\u8BA4\u503C\u8BEF\u8BFB\u4E3A\u771F\u5B9E\u6D4B\u8BC4\u7ED3\u679C\u3002</li>
    </ul>
  `;
    return section;
  }
  function createConsistencySection(c) {
    const el = document.createElement("div");
    el.className = "result-section consistency-section";
    const color = c.score >= 85 ? "var(--success)" : c.score >= 65 ? "var(--warning)" : "var(--danger)";
    el.innerHTML = `
    <h2>\u4F5C\u7B54\u4E00\u81F4\u6027</h2>
    <p class="section-desc">\u901A\u8FC7\u6B63\u53CD\u5411\u914D\u5BF9\u9898\u68C0\u6D4B\u4F5C\u7B54\u8D28\u91CF\uFF0C\u4E00\u81F4\u6027\u8D8A\u9AD8\u7ED3\u679C\u8D8A\u53EF\u9760</p>
    <div class="consistency-meter">
      <div class="consistency-score" style="color:${color}">${c.score}</div>
      <div class="consistency-detail">
        <span class="consistency-level">\u53EF\u4FE1\u5EA6\uFF1A${c.level}</span>
        <p>${c.note}</p>
      </div>
    </div>
  `;
    return el;
  }
  function createBigFiveSection(bigFive) {
    const section = document.createElement("div");
    section.className = "result-section";
    const keys = ["openness", "conscientiousness", "extraversion", "agreeableness", "emotionalStability"];
    const cx = 160, cy = 160, r = 110;
    const gridLevels = [0.25, 0.5, 0.75, 1];
    const axes = buildRadarAxes(keys, cx, cy, r);
    const points = buildRadarPoints(bigFive, keys, cx, cy, r);
    section.innerHTML = `
    <h2>\u5927\u4E94\u4EBA\u683C</h2>
    <p class="section-desc">IPIP-NEO \xB7 \u4EBA\u683C\u5FC3\u7406\u5B66\u91D1\u6807\u51C6\u4E94\u5927\u7EF4\u5EA6</p>
    <div class="radar-container">
      <svg viewBox="0 0 320 320" width="320" height="320" role="img" aria-label="\u5927\u4E94\u4EBA\u683C\u96F7\u8FBE\u56FE">
        ${gridLevels.map((lv) => `<polygon points="${buildRadarPoints(Object.fromEntries(keys.map((k) => [k, lv * 100])), keys, cx, cy, r)}" fill="none" stroke="rgba(196,165,116,0.15)" stroke-width="1"/>`).join("")}
        ${axes.map((a) => `<line x1="${cx}" y1="${cy}" x2="${a.x}" y2="${a.y}" stroke="rgba(196,165,116,0.2)" stroke-width="1"/>`).join("")}
        <polygon points="${points}" fill="rgba(196,165,116,0.25)" stroke="#c4a574" stroke-width="2"/>
        ${axes.map((a) => `<text x="${a.lx}" y="${a.ly}" text-anchor="middle" dominant-baseline="middle" fill="#9a9288" font-size="11">${a.label}</text>`).join("")}
      </svg>
    </div>
    <div class="trait-grid">${keys.map((k) => traitRowHTML(k, bigFive[k])).join("")}</div>
  `;
    return section;
  }
  function createFacetsSection(facets) {
    const section = document.createElement("div");
    section.className = "result-section";
    const groups = [
      { title: "\u5F00\u653E\u6027\u9762", keys: ["intellect", "aestheticOpenness"] },
      { title: "\u5C3D\u8D23\u6027\u9762", keys: ["industriousness", "orderliness"] },
      { title: "\u5916\u5411\u6027\u9762", keys: ["enthusiasm", "assertiveness"] },
      { title: "\u5B9C\u4EBA\u6027\u9762", keys: ["compassion", "politeness"] },
      { title: "\u795E\u7ECF\u8D28\u9762", keys: ["volatility", "withdrawal"] }
    ];
    section.innerHTML = `
    <h2>\u4EBA\u683C\u7CBE\u7EC6\u9762 (BFAS)</h2>
    <p class="section-desc">DeYoung \u5927\u4E94\u5C42\u9762\u91CF\u8868 \xB7 \u6BCF\u4E2A\u7EF4\u5EA6\u62C6\u5206\u4E3A 2 \u4E2A\u53EF\u72EC\u7ACB\u6D4B\u91CF\u7684\u5B50\u9762</p>
    ${groups.map((g) => `
      <div class="facet-group">
        <h3 class="facet-group-title">${g.title}</h3>
        <div class="trait-grid">${g.keys.map((k) => facetRowHTML(k, facets[k])).join("")}</div>
      </div>
    `).join("")}
  `;
    return section;
  }
  function facetRowHTML(key, score) {
    const meta = FACET_META[key];
    return `
    <div class="trait-row">
      <span class="trait-name">${(meta == null ? void 0 : meta.name) || key}</span>
      <div class="trait-bar-wrap"><div class="trait-bar" style="width:${score}%;background:${(meta == null ? void 0 : meta.color) || "#c4a574"}"></div></div>
      <span class="trait-score">${score}</span>
      <p class="trait-interpretation">${interpretFacet(key, score)}</p>
    </div>
  `;
  }
  function createTraitSection(title, desc, traits) {
    const section = document.createElement("div");
    section.className = "result-section";
    section.innerHTML = `
    <h2>${title}</h2>
    <p class="section-desc">${desc}</p>
    <div class="trait-grid">${traits.map(({ key, score }) => traitRowHTML(key, score)).join("")}</div>
  `;
    return section;
  }
  function traitRowHTML(key, score) {
    const meta = TRAIT_META[key];
    const pole = score >= 50 ? meta == null ? void 0 : meta.high : meta == null ? void 0 : meta.low;
    return `
    <div class="trait-row">
      <span class="trait-name">${(meta == null ? void 0 : meta.name) || key}${pole ? ` \xB7 ${pole}` : ""}</span>
      <div class="trait-bar-wrap"><div class="trait-bar" style="width:${score}%;background:${(meta == null ? void 0 : meta.color) || "#c4a574"}"></div></div>
      <span class="trait-score">${score}</span>
      <p class="trait-interpretation">${interpretTrait(key, score)}</p>
    </div>
  `;
  }
  function createValuesSection(values) {
    const sorted = Object.entries(values).sort(([, a], [, b]) => b - a);
    const section = document.createElement("div");
    section.className = "result-section";
    section.innerHTML = `
    <h2>\u6838\u5FC3\u4EF7\u503C\u5BFC\u5411</h2>
    <p class="section-desc">Schwartz \u57FA\u672C\u4EF7\u503C\u89C2 \xB7 \u9A71\u52A8\u4F60\u4EBA\u751F\u51B3\u7B56\u7684\u6DF1\u5C42\u52A8\u673A</p>
    <div class="values-ranking">
      ${sorted.map(([k, v], i) => {
      var _a, _b;
      return `
        <div class="value-row">
          <span class="value-rank">${i + 1}</span>
          <span class="value-name">${((_a = VALUE_META[k]) == null ? void 0 : _a.name) || k}</span>
          <div class="trait-bar-wrap"><div class="trait-bar" style="width:${v}%;background:${((_b = VALUE_META[k]) == null ? void 0 : _b.color) || "#c4a574"}"></div></div>
          <span class="trait-score">${v}</span>
        </div>
      `;
    }).join("")}
    </div>
    <p class="trait-interpretation" style="margin-top:1rem">${interpretValue(sorted[0][0], sorted[0][1])}</p>
  `;
    return section;
  }
  function createAttachmentSection(data) {
    const section = document.createElement("div");
    section.className = "result-section";
    section.innerHTML = `
    <h2>\u4F9D\u604B\u98CE\u683C</h2>
    <p class="section-desc">ECR-R \xB7 \u4EB2\u5BC6\u5173\u7CFB\u4E2D\u7684\u7126\u8651\u4E0E\u56DE\u907F\u6A21\u5F0F</p>
    <div class="attachment-grid">
      <div class="attachment-card">
        <h4>\u4F9D\u604B\u7126\u8651</h4>
        <div class="value">${data.attachment.anxiety}%</div>
        <p>${data.attachment.anxiety >= 55 ? "\u8F83\u9AD8 \u2014 \u9700\u8981\u66F4\u591A\u5B89\u5168\u611F\u786E\u8BA4" : data.attachment.anxiety <= 35 ? "\u8F83\u4F4E \u2014 \u5173\u7CFB\u4E2D\u8F83\u4E3A\u5B89\u5FC3" : "\u4E2D\u7B49 \u2014 \u5076\u5C14\u4F1A\u6709\u4E0D\u5B89\u5168\u611F"}</p>
      </div>
      <div class="attachment-card">
        <h4>\u4F9D\u604B\u56DE\u907F</h4>
        <div class="value">${data.attachment.avoidance}%</div>
        <p>${data.attachment.avoidance >= 55 ? "\u8F83\u9AD8 \u2014 \u503E\u5411\u4FDD\u6301\u60C5\u611F\u8DDD\u79BB" : data.attachment.avoidance <= 35 ? "\u8F83\u4F4E \u2014 \u4E50\u4E8E\u4EB2\u5BC6\u8868\u8FBE" : "\u4E2D\u7B49 \u2014 \u5728\u4EB2\u5BC6\u4E0E\u72EC\u7ACB\u95F4\u5E73\u8861"}</p>
      </div>
    </div>
    <div class="attachment-type">
      <h3>${data.attachmentType.name}</h3>
      <p>${data.attachmentType.desc}</p>
    </div>
  `;
    return section;
  }
  function createCareerSection(career) {
    const section = document.createElement("div");
    section.className = "result-section career-section";
    const keys = ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];
    const cx = 160, cy = 160, r = 100;
    const axes = keys.map((key, i) => {
      const angle = Math.PI * 2 * i / keys.length - Math.PI / 2;
      return {
        key,
        lx: cx + Math.cos(angle) * (r + 24),
        ly: cy + Math.sin(angle) * (r + 24),
        label: RIASEC_META[key].name
      };
    });
    const points = keys.map((key, i) => {
      const angle = Math.PI * 2 * i / keys.length - Math.PI / 2;
      const v = career.scores[key] / 100;
      return `${cx + Math.cos(angle) * r * v},${cy + Math.sin(angle) * r * v}`;
    }).join(" ");
    section.innerHTML = `
    <h2>\u804C\u4E1A\u5174\u8DA3\u5339\u914D</h2>
    <p class="section-desc">Holland RIASEC \u6A21\u578B \xB7 \u7ED3\u5408\u4EBA\u683C\u7279\u8D28\u7684 75/25 \u52A0\u6743\u804C\u4E1A\u5174\u8DA3\u5206\u6790</p>
    <div class="career-code-row">
      <div class="type-badge holland-badge">${career.hollandCode}</div>
      <div class="career-primary">
        <span>\u6838\u5FC3\u7C7B\u578B</span>
        <strong>${career.primary.name} (${career.primary.code})</strong>
        <p>${career.primary.desc}</p>
      </div>
    </div>
    <div class="radar-container">
      <svg viewBox="0 0 320 320" width="300" height="300" role="img" aria-label="RIASEC \u804C\u4E1A\u5174\u8DA3\u96F7\u8FBE\u56FE">
        ${[0.25, 0.5, 0.75, 1].map((lv) => {
      const pts = keys.map((_, i) => {
        const angle = Math.PI * 2 * i / keys.length - Math.PI / 2;
        return `${cx + Math.cos(angle) * r * lv},${cy + Math.sin(angle) * r * lv}`;
      }).join(" ");
      return `<polygon points="${pts}" fill="none" stroke="rgba(196,165,116,0.12)" stroke-width="1"/>`;
    }).join("")}
        ${keys.map((_, i) => {
      const angle = Math.PI * 2 * i / keys.length - Math.PI / 2;
      return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r}" y2="${cy + Math.sin(angle) * r}" stroke="rgba(196,165,116,0.15)" stroke-width="1"/>`;
    }).join("")}
        <polygon points="${points}" fill="rgba(110,168,212,0.2)" stroke="#6a9fd4" stroke-width="2"/>
        ${axes.map((a) => `<text x="${a.lx}" y="${a.ly}" text-anchor="middle" dominant-baseline="middle" fill="#9a9288" font-size="10">${a.label}</text>`).join("")}
      </svg>
    </div>
    <div class="trait-grid">
      ${career.sorted.map((t) => `
        <div class="trait-row">
          <span class="trait-name">${t.name} (${t.code})</span>
          <div class="trait-bar-wrap"><div class="trait-bar" style="width:${t.score}%;background:${t.color}"></div></div>
          <span class="trait-score">${t.score}</span>
        </div>
      `).join("")}
    </div>
    <div class="career-env">
      <h3>\u7406\u60F3\u5DE5\u4F5C\u73AF\u5883</h3>
      <p>${career.workEnvironment.summary}</p>
      <p class="career-avoid"><span>\u5EFA\u8BAE\u907F\u514D\uFF1A</span>${career.workEnvironment.avoid}</p>
    </div>
    <h3 class="career-subtitle">\u63A8\u8350\u804C\u4E1A\u65B9\u5411</h3>
    <div class="career-list">
      ${career.recommendations.map((c, i) => `
        <div class="career-card">
          <div class="career-card-header">
            <span class="career-rank">${i + 1}</span>
            <span class="career-title">${c.title}</span>
            <span class="career-fit">${c.fit} \u5339\u914D</span>
          </div>
          <span class="career-codes">${c.codes}</span>
          <p>${c.desc}</p>
        </div>
      `).join("")}
    </div>
    <ul class="insights-list" style="margin-top:1rem">
      ${career.careerInsights.map((ins) => `<li>${ins}</li>`).join("")}
    </ul>
  `;
    return section;
  }
  function createInterpersonalSection(ip) {
    const section = document.createElement("div");
    section.className = "result-section";
    const styles = [
      { key: "collaborating", name: "\u5408\u4F5C\u578B", score: ip.collaborating, color: "#7eb88a", desc: "\u5BFB\u6C42\u53CC\u8D62\uFF0C\u7EF4\u62A4\u5173\u7CFB" },
      { key: "asserting", name: "\u7ADE\u4E89\u578B", score: ip.asserting, color: "#e0a050", desc: "\u575A\u6301\u7ACB\u573A\uFF0C\u4E89\u53D6\u5229\u76CA" },
      { key: "avoiding", name: "\u56DE\u907F\u578B", score: ip.avoiding, color: "#6a9fd4", desc: "\u56DE\u907F\u51B2\u7A81\uFF0C\u4FDD\u6301\u548C\u8C10" }
    ];
    const dominant = styles.sort((a, b) => b.score - a.score)[0];
    section.innerHTML = `
    <h2>\u4EBA\u9645\u51B2\u7A81\u98CE\u683C</h2>
    <p class="section-desc">TKI \u51B2\u7A81\u6A21\u5F0F \xB7 \u4F60\u5728\u5206\u6B67\u4E2D\u7684\u5178\u578B\u5E94\u5BF9\u65B9\u5F0F</p>
    <p class="dominant-style">\u4E3B\u5BFC\u98CE\u683C\uFF1A<strong>${dominant.name}</strong>\uFF08${dominant.score}\u5206\uFF09\u2014 ${dominant.desc}</p>
    <div class="trait-grid">${styles.map((s) => `
      <div class="trait-row">
        <span class="trait-name">${s.name}</span>
        <div class="trait-bar-wrap"><div class="trait-bar" style="width:${s.score}%;background:${s.color}"></div></div>
        <span class="trait-score">${s.score}</span>
      </div>
    `).join("")}</div>
  `;
    return section;
  }
  function createCognitiveSection(cognitive) {
    const section = document.createElement("div");
    section.className = "result-section";
    section.innerHTML = `
    <h2>\u8BA4\u77E5\u52A0\u5DE5\u98CE\u683C</h2>
    <p class="section-desc">\u57FA\u4E8E Big Five \u5B9E\u8BC1\u5173\u8054\u63A8\u5BFC\uFF08\u975E MBTI \u56FA\u5B9A\u7C7B\u578B\uFF09</p>
    <div class="type-badge">${cognitive.code}</div>
    <div class="trait-grid" style="margin-top:1rem">
      ${Object.entries(cognitive.dimensions).map(([label, d]) => `
        <div class="trait-row">
          <span class="trait-name">${label}</span>
          <div class="trait-bar-wrap"><div class="trait-bar" style="width:${d.value}%;background:#c4a574"></div></div>
          <span class="trait-score">${d.value >= 50 ? d.right.split(" ")[1] : d.left.split(" ")[1]}</span>
          <p class="trait-interpretation">${d.left} \u2190 \u2192 ${d.right}</p>
        </div>
      `).join("")}
    </div>
  `;
    return section;
  }
  function createStrengthsSection({ strengths, growth }) {
    const section = document.createElement("div");
    section.className = "result-section";
    section.innerHTML = `
    <h2>\u4F18\u52BF\u4E0E\u6210\u957F</h2>
    <p class="section-desc">\u57FA\u4E8E\u5168\u7EF4\u5EA6\u5F97\u5206\u751F\u6210\u7684\u4E2A\u6027\u5316\u53D1\u5C55\u5EFA\u8BAE</p>
    <div class="sw-grid">
      <div class="sw-col">
        <h3 class="sw-title strengths-title">\u6838\u5FC3\u4F18\u52BF</h3>
        <ul class="insights-list">${strengths.map((s) => `<li>${s}</li>`).join("") || "<li>\u5404\u7EF4\u5EA6\u53D1\u5C55\u5747\u8861</li>"}</ul>
      </div>
      <div class="sw-col">
        <h3 class="sw-title growth-title">\u6210\u957F\u65B9\u5411</h3>
        <ul class="insights-list growth-list">${growth.map((g) => `<li>${g}</li>`).join("") || "<li>\u7EE7\u7EED\u4FDD\u6301\u5F53\u524D\u72B6\u6001</li>"}</ul>
      </div>
    </div>
  `;
    return section;
  }
  function createInsightsSection(insights) {
    const section = document.createElement("div");
    section.className = "result-section";
    section.innerHTML = `
    <h2>\u6DF1\u5EA6\u6D1E\u5BDF</h2>
    <p class="section-desc">\u8DE8\u7EF4\u5EA6\u4EA4\u53C9\u5206\u6790 \xB7 \u63ED\u793A\u7EF4\u5EA6\u4E4B\u95F4\u7684\u72EC\u7279\u7EC4\u5408\u6A21\u5F0F</p>
    <ul class="insights-list">${insights.map((i) => `<li>${i}</li>`).join("")}</ul>
  `;
    return section;
  }
  function generateQuickReportText(r) {
    const lines = ["\u771F\u6211\u6D1E\u5BDF \xB7 50\u9898\u5FEB\u901F\u7248\u4EBA\u683C\u8BC4\u4F30\u62A5\u544A", "=".repeat(44), ""];
    lines.push(`\u3010\u4EBA\u683C\u539F\u578B\u3011${r.archetype.name}`);
    lines.push(r.archetype.desc);
    lines.push("");
    lines.push("\u3010\u5927\u4E94\u4EBA\u683C\u3011");
    Object.entries(r.bigFive).forEach(([k, v]) => {
      var _a;
      return lines.push(`  ${((_a = TRAIT_META[k]) == null ? void 0 : _a.name) || k}: ${v}%`);
    });
    lines.push("");
    lines.push("\u3010\u62A5\u544A\u8BF4\u660E\u3011\u5FEB\u901F\u7248\u57FA\u4E8E 50 \u9053\u5927\u4E94\u4EBA\u683C\u9898\u751F\u6210\uFF0C\u4E0D\u5C55\u793A\u672A\u4F5C\u7B54\u91CF\u8868\u5206\u6570\u3002\u82E5\u9700\u4F9D\u604B\u3001\u60C5\u7EEA\u3001\u4EF7\u503C\u89C2\u3001\u52A8\u673A\u4E0E\u804C\u4E1A\u5174\u8DA3\u5EFA\u8BAE\uFF0C\u8BF7\u9009\u62E9 188 \u9898\u8BE6\u7EC6\u7248\u3002");
    lines.push("");
    lines.push("\u2014\u2014 \u672C\u62A5\u544A\u4EC5\u4F9B\u81EA\u6211\u63A2\u7D22\u53C2\u8003\uFF0C\u4E0D\u80FD\u66FF\u4EE3\u4E13\u4E1A\u5FC3\u7406\u8BC4\u4F30\u3002");
    return lines.join("\n");
  }
  function downloadReport() {
    const reportData = latestResult || scoreAssessment(answers);
    const text = assessmentMode === "quick" ? generateQuickReportText(reportData) : generateReportText(reportData);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `\u771F\u6211\u6D1E\u5BDF-${ASSESSMENT_MODES[assessmentMode].reportName}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
  document.querySelectorAll(".version-start").forEach((button) => {
    button.addEventListener("click", () => {
      var _a;
      const pickedMode = button.dataset.mode || "full";
      const hasProgress = loadProgress();
      if (hasProgress && assessmentMode === pickedMode && confirm(`\u68C0\u6D4B\u5230\u672A\u5B8C\u6210\u7684${ASSESSMENT_MODES[assessmentMode].label}\u8FDB\u5EA6\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F
\uFF08\u9009\u62E9\u201C\u53D6\u6D88\u201D\u5C06\u91CD\u65B0\u5F00\u59CB\uFF09`)) {
        lastSection = currentIndex > 0 ? (_a = selectedQuestions[currentIndex - 1]) == null ? void 0 : _a.section : null;
      } else {
        clearProgress();
        setAssessmentMode(pickedMode);
        lastSection = null;
      }
      showView(assessment);
      renderQuestion();
    });
  });
  $("#back-btn").addEventListener("click", () => {
    if (Object.keys(answers).length && !confirm("\u786E\u5B9A\u8FD4\u56DE\uFF1F\u5F53\u524D\u8FDB\u5EA6\u5DF2\u81EA\u52A8\u4FDD\u5B58\u3002")) return;
    showView(landing);
  });
  $("#prev-btn").addEventListener("click", () => {
    var _a;
    if (currentIndex > 0) {
      currentIndex--;
      lastSection = currentIndex > 0 ? (_a = selectedQuestions[currentIndex - 1]) == null ? void 0 : _a.section : null;
      renderQuestion();
    }
  });
  $("#next-btn").addEventListener("click", () => {
    if (answers[selectedQuestions[currentIndex].id] === void 0) return;
    if (currentIndex < selectedQuestions.length - 1) {
      currentIndex++;
      saveProgress();
      renderQuestion();
    } else {
      showView(results);
      renderResults();
    }
  });
  $("#retake-btn").addEventListener("click", () => {
    clearProgress();
    showView(landing);
  });
  $("#download-btn").addEventListener("click", downloadReport);
  document.addEventListener("keydown", (e) => {
    if (!assessment.classList.contains("active")) return;
    if (e.key >= "1" && e.key <= "5") {
      const input = document.querySelector(`input[name="answer"][value="${e.key}"]`);
      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    if (e.key === "ArrowRight" && !$("#next-btn").disabled) $("#next-btn").click();
    if (e.key === "ArrowLeft" && !$("#prev-btn").disabled) $("#prev-btn").click();
  });
})();
