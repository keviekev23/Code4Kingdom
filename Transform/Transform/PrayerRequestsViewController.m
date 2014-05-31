//
//  PrayerRequestsViewController.m
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "PrayerRequestsViewController.h"

@interface PrayerRequestsViewController ()

- (void) loadCurrentLocalUrl:(NSString *)url;
- (void) loadJavascript:(NSString *)url;

@end

@implementation PrayerRequestsViewController

@synthesize contentWebView = _contentWebView;
@synthesize currentUrlName = _currentUrlName;

- (void) loadCurrentLocalUrl:(NSString *)url
{
    NSString *filename = [[NSBundle mainBundle] pathForResource:url ofType:@"html"];
    NSString *path = [[NSBundle mainBundle] bundlePath];
    NSURL *baseURL = [NSURL fileURLWithPath:path];
    NSString* htmlString = [NSString stringWithContentsOfFile:filename encoding:NSUTF8StringEncoding error:nil];
    [self.contentWebView loadHTMLString:htmlString baseURL:baseURL];
}

- (void) loadJavascript:(NSString *)url
{
    NSString *filePath = [[NSBundle mainBundle] pathForResource:url ofType:@"js"];
    if (filePath) {
        NSString *script = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
        [self.contentWebView stringByEvaluatingJavaScriptFromString:script];
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.currentUrlName = @"prayer";
    [self loadCurrentLocalUrl:self.currentUrlName];
}

#pragma mark - UIWebViewDelegate
- (void)webViewDidFinishLoad:(UIWebView *)webView
{
//    NSString *jqueryCDN = @"http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
//    NSData *jquery = [NSData dataWithContentsOfURL:[NSURL URLWithString:jqueryCDN]];
//    NSString *jqueryString = [[NSMutableString alloc] initWithData:jquery encoding:NSUTF8StringEncoding];
//    [webView stringByEvaluatingJavaScriptFromString:jqueryString];
//    
    [self loadJavascript:@"js/bootstrap"];
    [self loadJavascript:@"prayer"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
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
