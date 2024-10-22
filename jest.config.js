// jest.config.js
module.exports = {
    roots: ['<rootDir>'],
    setupFiles: ["./jest.setup.js"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    moduleDirectories: ['node_modules', 'src'],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next|cypress)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        "@/context/(.*)": "<rootDir>/context/$1",
        "@/utils/(.*)": "<rootDir>/utils/$1",
        "@/components/(.*)": "<rootDir>/components/$1",
        "@/types/(.*)": "<rootDir>/types/$1",
        "@/pages/(.*)": "<rootDir>/pages/$1",
        "@/public/(.*)": "<rootDir>/public/$1",
        "@/config/(.*)": "<rootDir>/config/$1",
        "@/controllers/(.*)": "<rootDir>/controllers/$1",
        "@/data/(.*)": "<rootDir>/data/$1",
        "@/mocks/(.*)": "<rootDir>/mocks/$1",
        "@/firebase/(.*)": "<rootDir>/firebase/$1",
        "@/graphql/(.*)": "<rootDir>/graphql/$1",
        "@/hooks/(.*)": "<rootDir>/hooks/$1",
        "@/styles/(.*)": "<rootDir>/styles/$1",
    },
    collectCoverageFrom: [
        "<rootDir>/components/**/*.tsx",
        "<rootDir>/pages/**/*.tsx",
        "<rootDir>/utils/**/*.tsx"
    ],
    coverageThreshold: {
        global: {
            "branches": 90,
            "functions": 90,
            "lines": 90,
            "statements": 90
        }
    },
    coverageReporters: [
        "html",
        "text"
    ]
}