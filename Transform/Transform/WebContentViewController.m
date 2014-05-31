//
//  WebContentViewController.m
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "WebContentViewController.h"

@interface WebContentViewController ()

@end

@implementation WebContentViewController

@synthesize webView = _webView;



- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.webView.delegate = self;
    
    self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:92.0/255.0 green:184.0/255.0 blue:230.0/255.0 alpha:1.0];
    self.navigationController.navigationBar.translucent = NO;
}

- (void) loadCurrentLocalUrl:(NSString *)url
{
    NSString *filename = [[NSBundle mainBundle] pathForResource:url ofType:@"html"];
    NSString *path = [[NSBundle mainBundle] bundlePath];
    NSURL *baseURL = [NSURL fileURLWithPath:path];
    NSString* htmlString = [NSString stringWithContentsOfFile:filename encoding:NSUTF8StringEncoding error:nil];
    [self.webView loadHTMLString:htmlString baseURL:baseURL];
}

- (void) loadJavascript:(NSString *)url
{
    NSString *filePath = [[NSBundle mainBundle] pathForResource:url ofType:@"js"];
    if (filePath) {
        NSString *script = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
        [self.webView stringByEvaluatingJavaScriptFromString:script];
    }
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
